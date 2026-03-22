const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { dataDir, sessionCookieName } = require("./config");

const USERS_FILE = path.join(dataDir, "users.json");
const sessions = new Map();

async function ensureUsersFile() {
  await fs.promises.mkdir(dataDir, { recursive: true });

  try {
    await fs.promises.access(USERS_FILE);
  } catch {
    await fs.promises.writeFile(USERS_FILE, "[]", "utf8");
  }
}

async function registerUser({ name, email, password }) {
  await ensureUsersFile();
  validateCredentials({ name, email, password, requireName: true });

  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => user.email === normalizedEmail)) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  await writeUsers(users);

  return publicUser(user);
}

async function loginUser({ email, password }) {
  await ensureUsersFile();
  validateCredentials({ email, password });

  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  return publicUser(user);
}

function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    user,
    createdAt: Date.now()
  });
  return token;
}

function getSessionFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[sessionCookieName];

  if (!token) {
    return null;
  }

  const session = sessions.get(token);
  return session ? session.user : null;
}

function clearSession(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[sessionCookieName];

  if (token) {
    sessions.delete(token);
  }
}

function buildSessionCookie(token) {
  return `${sessionCookieName}=${token}; HttpOnly; Path=/; SameSite=Lax`;
}

function buildExpiredSessionCookie() {
  return `${sessionCookieName}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

async function readUsers() {
  const raw = await fs.promises.readFile(USERS_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeUsers(users) {
  await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function validateCredentials({ name, email, password, requireName = false }) {
  if (requireName && (!name || String(name).trim().length < 2)) {
    const error = new Error("Name must contain at least 2 characters.");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    const error = new Error("Please provide a valid email address.");
    error.statusCode = 400;
    throw error;
  }

  if (!password || String(password).length < 8) {
    const error = new Error("Password must contain at least 8 characters.");
    error.statusCode = 400;
    throw error;
  }
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  const [salt, expectedHash] = String(storedHash).split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(expectedHash, "hex"), Buffer.from(derivedKey, "hex"));
}

function parseCookies(cookieHeader) {
  return cookieHeader
    .split(";")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .reduce((accumulator, pair) => {
      const separatorIndex = pair.indexOf("=");
      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = pair.slice(0, separatorIndex);
      const value = pair.slice(separatorIndex + 1);
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
}

module.exports = {
  buildExpiredSessionCookie,
  buildSessionCookie,
  clearSession,
  createSession,
  getSessionFromRequest,
  loginUser,
  registerUser
};
