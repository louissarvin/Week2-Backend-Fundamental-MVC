import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";
import PromptSync from "prompt-sync";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let users = [];
let currentUser = null;

const prompt = PromptSync({ sigint: true });

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.log("Tidak ada file users.json. Akan dibuat file baru.");
  }
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
  // tulis code di sini
  console.clear();
  console.log(chalk.yellow.bold("=== Login ==="));
  const username = await question(chalk.blue("Username: "));
  const password = prompt(chalk.blue("Password: "), { echo: "*" });

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user.username;
    await saveUsers(users);
    console.log(chalk.green("Login successful!"));
    console.log(chalk.cyan(`Welcome back, ${username}!`));
  } else {
    console.log(
      chalk.red("Invalid username or password. Or you are already logged in.")
    );
  }
}

async function register() {
  // tulis code di sini
  console.clear();
  console.log(chalk.yellow.bold("=== Register ==="));
  const username = await question(chalk.blue("Choose a username: "));
  const password = prompt(chalk.blue("Choose a password: "), { echo: "*" });

  if (users.some((u) => u.username === username)) {
    console.log(chalk.red("Username already exists."));
  } else {
    users.push({
      username,
      password,
      highestScore: 0,
    });
    await saveUsers(users);
    console.log(chalk.green("Registration successful!"));
  }
}

async function logout() {
  console.clear();
  console.log(chalk.yellow.bold("=== Logout ==="));
  const username = await question(chalk.blue("Enter your username: "));

  const user = users.find((u) => u.username === username);

  if (user && user.username === currentUser) {
    currentUser = null;
    console.log(chalk.green(`${username} has been logged out.`));
  } else {
    console.log(chalk.red("User not found or not logged in."));
  }
}

async function startMenu() {
  // tulis code di sini
  while (true) {
    console.log("\n");
    console.log(chalk.yellow.bold("--- Guessing Game ---"));
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Exit");
    const choice = await question(chalk.blue.bold("Pilih Opsi (1-3): "));

    switch (choice) {
      case "1":
        await login();
        if (currentUser != null) {
          await mainMenu();
        } else {
          console.log(chalk.red("Login gagal. Silakan coba lagi."));
        }
        break;
      case "2":
        await register();
        break;
      case "3":
        console.log(chalk.green("Terima kasih telah bermain!"));
        rl.close();
        process.exit(0);
      default:
        console.log(chalk.red("Opsi tidak valid. Silakan coba lagi."));
    }
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
  // tulis code di sini
  while (true) {
    console.log("\n");
    console.log(chalk.yellow.bold("--- Main Menu ---"));
    console.log("1. Mulai Game");
    console.log("2. Lihat Papan Skor");
    console.log("3. Logout");
    const choice = await question(chalk.blue.bold("Pilih Opsi (1-3): "));

    switch (choice) {
      case "1":
        await playGame();
        break;
      case "2":
        await showLeaderboard();
        break;
      case "3":
        await logout();
        if (currentUser == null) {
          await startMenu();
          return;
        } else {
          console.log(chalk.red("Logout gagal. Silakan coba lagi."));
        }
      default:
        console.log(chalk.red("Opsi tidak valid. Silakan coba lagi."));
    }
  }
}

async function showLeaderboard() {
  // tulis code di sini
  console.clear();
  console.log(chalk.yellow.bold("--- Papan Skor (Top 10) ---"));
  const sortedUsers = [...users].sort(
    (a, b) => a.highestScore - b.highestScore
  );
  sortedUsers.slice(0, 10).forEach((user, index) => {
    console.log(
      `${index + 1}. ${user.username}: ${user.highestScore} percobaan`
    );
  });
}

async function playGame() {
  // tulis code di sini
  console.clear();
  console.log(chalk.yellow.bold("--- Tebak Angka ---"));
  console.log("Tebak angka antara 1 dan 100");
  const numberToGuess = Math.floor(Math.random() * 100) + 1;

  await makeGuess(numberToGuess);
}

async function makeGuess(numberToGuess) {
  let attempts = 0;
  let guessed = false;

  while (!guessed) {
    const guess = await question(chalk.blue("Tebakan Anda : "));
    attempts++;
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log(chalk.red("Tebakan tidak valid. Masukkan angka antara 1 dan 100."));
      continue;
    }

    if (Number(guess) === numberToGuess) {
        console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${attempts} percobaan.`));
        const user = users.find((u) => u.username === currentUser);
        if(user && user.highestScore === 0) {
            user.highestScore = attempts;
            await saveUsers(users);
        }
        guessed = true;
    } else if (Number(guess) < numberToGuess) {
        console.log(chalk.yellow("Terlalu rendah."));
    } else {
        console.log(chalk.yellow("Terlalu tinggi."));
    }
  }
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
