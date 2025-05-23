# Vite + Electron + React + TypeScript Template

This is a simple template to develop your personal desktop apps with Electron and React.

## Project setup for Windows

1. Move to your workspace directory and `git clone` or download this repository.

2. Install dependencies.

```
npm ci
```

3. Start app for development.

```
npm start
```

4. Prepare icon(512 X 512 PNG) and store it like `assets/icon.png`.

5. Build distribution.

```
npm run dist
```

That's it! You can find installer for your app in the `dist` directory.

## Project setup with rename

1. Move to your workspace directory and `git clone` or download this repository.

If you want to rename it on `git clone`, do the following.

```
git clone git@github.com:sakait-pc/vite-electron-react-ts.git <YOUR_PROJECT_NAME>
```

2. If you are not interested in the history of this repository, delete `.git` directory.

3. Rename `name` and `build: appId` fields in the `package.json`.

4. Install dependencies.

```
npm ci
```

And then `name` field in the `package-lock.json` is automatically renamed.

5. Start app for development.

```
npm start
```

6. Prepare icon(512 X 512 PNG) and store it like `assets/icon.png`.

7. Build distribution.

```
npm run dist
```

That's it! You can find installer for your app in the `dist` directory.

## Project setup for Mac OS

1. Move to your workspace directory and `git clone` or download this repository.

2. Install dependencies.

```
npm ci
```

3. Start app for development.

```
npm run sm
```

4. Prepare icon(512 X 512 PNG) and store it like `assets/icon.png`.

5. Build distribution.

```
npm run dist-mac
```

That's it! You can find installer for your app in the `dist` directory.

## TODO

- ESLint
- Prettier
