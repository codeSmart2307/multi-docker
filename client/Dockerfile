FROM node:lts-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy the build dir from the 0th build stage to the nginx dir
COPY --from=0 /app/build /usr/share/nginx/html