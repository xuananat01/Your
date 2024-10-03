FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY package.json yarn.lock ./

# Cài đặt các phụ thuộc (dependencies)
RUN yarn install --network-timeout 100000

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Chuyển đến thư mục android trước khi chạy lệnh ./gradlew
WORKDIR /app/android

# Cấp quyền cho gradlew
RUN chmod +x ./gradlew

# Build ứng dụng
RUN ./gradlew clean

# Quay lại thư mục gốc
WORKDIR /app

# Build dự án React Native
RUN yarn android

# Thiết lập lệnh mặc định để chạy Metro bundler
CMD ["yarn", "start"]

