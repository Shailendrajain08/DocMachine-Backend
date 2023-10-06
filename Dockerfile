FROM node:11.8.0-alpine
# FROM node:16.3.0-alpine
RUN apk --no-cache upgrade && apk add --no-cache chromium \
    alpine-sdk \
    python \
    pdftk \
    ocaml \
    libelf-dev \
    poppler-utils \
    ghostscript \
    tesseract-ocr 






# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND pack age-lock.json are copied
# where available  (npm@5+)
COPY package*.json ./

RUN npm install --unsafe-perm

RUN cp "./node_modules/pdf-extract/share/eng.traineddata" "../../share/tessdata/eng.traineddata"
RUN cp "./node_modules/pdf-extract/share/configs/alphanumeric" "../../share/tessdata/configs/alphanumeric"

# RUN apk update && apk upgrade && apk add --no-cache \
#     alpine-sdk \
#     python \
#     pdftk \
#     ocaml \
#     libelf-dev \
#     poppler-utils \
#     ghostscript \
#     tesseract-ocr

# If you are building your code for  productionm  
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000 

CMD [ "node", "main.js" ]
# CMD pm2 start google-chrome \
#     --interpreter none \
#     -- \
#     --headless \
#     --disable-gpu \
#     --disable-translate \
#     --disable-extensions \
#     --disable-background-networking \
#     --safebrowsing-disable-auto-update \
#     --disable-sync \
#     --metrics-recording-only \
#     --disable-default-apps \
#     --no-first-run \
#     --mute-audio \
#     --hide-scrollbars \
#     --remote-debugging-port=9000

