FROM mcr.microsoft.com/playwright:v1.49.0

WORKDIR /wikipedia-test-task

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "--reporter=html"]
