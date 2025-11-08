# 🗓️ Hackathons Calendar

Interaktywny kalendarz hackathonów - statyczna aplikacja Next.js z dwoma widokami: kalendarzem miesięcznym i listą.

**🔗 Live Demo:** [knsiexpert.github.io/hackathons-calendar](https://knsiexpert.github.io/hackathons-calendar/)  
**📦 GitHub:** [github.com/knsiexpert/hackathons-calendar](https://github.com/knsiexpert/hackathons-calendar)

![Hackathons Calendar Preview](https://i.imgur.com/MkPrO2w.png)

## ✨ Funkcje

- 📅 **Widok kalendarza** - przeglądaj hackathony w formie kalendarza miesięcznego
- 📋 **Widok listy** - sortuj i filtruj hackathony według statusu
- 🎨 **Nowoczesny design** - ciemny motyw z pomarańczowymi akcentami
- 📱 **Responsywny** - działa świetnie na wszystkich urządzeniach
- ⚡ **Szybki** - statyczna strona wygenerowana z Next.js

## 🚀 Deployment do GitHub Pages

Projekt jest skonfigurowany do automatycznego deploymentu na GitHub Pages.

### Automatyczny deployment (GitHub Actions)

1. **Włącz GitHub Pages w ustawieniach repozytorium:**
   - Idź do Settings → Pages
   - W sekcji "Source" wybierz "GitHub Actions"
   
2. **Push do brancha `main`:**
   ```bash
   git push origin main
   ```
   
   Automatycznie uruchomi się workflow, który zbuduje i wdroży aplikację.

3. **Aplikacja będzie dostępna pod:**
   ```
   https://<username>.github.io/hackathons-calendar/
   ```

### Manualny deployment

Możesz też wykonać deployment lokalnie:

```bash
# Zainstaluj zależności
npm install --legacy-peer-deps

# Zbuduj i wdróż
npm run deploy
```

**Uwaga:** Przy manualnym deploymencie musisz mieć skonfigurowany dostęp do repozytorium.

## 🛠️ Development

```bash
# Zainstaluj zależności
npm install --legacy-peer-deps

# Uruchom serwer developerski
npm run dev

# Zbuduj produkcyjną wersję
npm run build

# Deploy do GitHub Pages
npm run deploy
```

## 📦 Konfiguracja

Aplikacja jest skonfigurowana z `basePath: '/hackathons-calendar'` w `next.config.mjs`.

basePath jest automatycznie aktywowany tylko dla produkcji (GitHub Pages), podczas developmentu lokalnie działa bez basePath.

## 🛠️ Stack technologiczny

- **Next.js 14** - React framework ze statycznym exportem
- **TypeScript** - type safety
- **Tailwind CSS 3** - utility-first CSS
- **Shadcn/ui** - komponenty UI
- **React Hook Form** - zarządzanie formularzami
- **date-fns** - operacje na datach
- **Lucide React** - ikony

## 📄 Dane

Dane hackathonów znajdują się w pliku `public/hackathons.json`. Struktura pojedynczego hackathonu:

```json
{
  "id": "unique-id",
  "nazwa": "Nazwa hackathonu",
  "opis": "Krótki opis",
  "kategoria": "AI & ML",
  "status": "nadchodzący",
  "data_odbycia": "2025-01-15",
  "data_odbycia_do": "2025-01-17",
  "data_rejestracji_od": "2024-12-01",
  "data_rejestracji_do": "2025-01-10",
  "link": "https://example.com"
}
```

## 👥 Autorzy

Projekt stworzony przez **KNSI Expert** - Koło Naukowe Sztucznej Inteligencji.

## 📝 Licencja

Projekt open-source dostępny do użytku i modyfikacji.