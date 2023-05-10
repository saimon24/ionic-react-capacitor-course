# Create a new app
ionic start myApp blank --type react

# Add native platforms
ionic build
ionic cap add ios
ionic cap add android

## Livereload
ionic cap run ios --livereload --external --public-host=192.168.x.xx

# Install Swiper
npm install swiper

# Install Plugins
npm install @capacitor/preferences
npm install @capacitor/camera

# Generate Assets
npm install --save-dev @capacitor/assets
npx @capacitor/assets generate --iconBackgroundColor '#0A091A' --splashBackgroundColor '#0A091A'

# Electron support
npm i @capacitor-community/electron
npx cap add @capacitor-community/electron
npx cap open @capacitor-community/electron