# Prettier Config Generator

**Instantly generate a Prettier configuration with full UI support, version-awareness, and modern UX.**
Built with Next.js, Tailwind CSS, and shadcn/ui.

🔗 **Live Site:** [prettier-config-generator.nooobtimex.me](https://prettier-config-generator.nooobtimex.me)

---

## 🚀 Features

- ✅ Toggle all official Prettier options (as of the latest version)
- 🧠 Intelligent descriptions & tooltips for each setting
- 🕹 Real-time config preview (JSON, `.prettierrc`, CLI flags)
- 🧩 Supports Prettier plugin compatibility
- 📦 Instant copy-to-clipboard for generated configs
- 🧪 Built with full type safety and modular architecture

---

## 🛠 Tech Stack

| Layer            | Stack                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| Framework        | [Next.js 15 (App Router)](https://nextjs.org/docs)                               |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com) |
| Component System | Radix UI Primitives via shadcn                                                   |
| State Mgmt       | Local state + derived config generation utils                                    |
| Deployment       | [Vercel](https://vercel.com)                                                     |

---

## 🧩 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/your-username/prettier-config-generator.git
cd prettier-config-generator

# 2. Install dependencies
pnpm install

# 3. Run the app
pnpm dev
```

> Requires Node.js 18+ and pnpm.

---

## 🧠 Architecture Notes

- Config option metadata is fully typed and version-controlled.
- Each Prettier option is encapsulated with:

  - Key
  - Type (`boolean` | `string` | `enum`)
  - Default value
  - CLI flag format
  - Prettier version availability

- Generators produce outputs for `.prettierrc`, CLI args, and JSON.

---

## 🤝 Contributing

Pull requests and feedback are welcome. Please follow the established coding standards and submit issues for any bugs or feature requests.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 🧑‍💻 Author

**Wongsaphat "Kwan" Puangsorn**
[GitHub](https://github.com/nooobtimex) · [LinkedIn](https://www.linkedin.com/in/wongsaphat-puangsorn)

---

Let me know if you want the README translated into Thai or if you'd like badges (e.g., Vercel deploy, license, etc.) added.
