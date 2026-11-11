# Decir que imagen base ocuparemos
FROM nginx:alpine

# Copiar el archivo index.html
COPY index.html /usr/share/nginx/html/

# Copiar nuestros recursos a la imagen
COPY src/ /usr/share/nginx/html/src/

# Indicar el puerto donde se expone el servicio
EXPOSE 80
