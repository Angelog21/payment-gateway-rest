**Instalación y ejecución (rápido)**

- **Requisitos**:
	- Node.js 24+ (este repo fue probado con PHP 24.11 en entorno Laragon).
	- Tener instalado nodemon de forma global.
	- Laragon (opcional en Windows) o cualquier servidor web (Apache/Nginx).

- **Clonar y preparar**:
	1. Clona el repositorio dentro de la carpeta de tu servidor (por ejemplo en Laragon `C:\laragon\www`):
		 ```bash
		 git clone https://github.com/Angelog21/payment-gateway-rest.git payment-gateway-rest
		 cd payment-gateway-rest
		 ```
	2. Instala dependencias de Node y Express:
		 ```bash
		 npm install
		 ```
	3. Crea un archivo de entorno con los siguientes valores:
		 ```bash
		 PORT=3000
         SOAP_SERVICE_URL=http://localhost:8000
		 ```
	

- **Levantar la aplicación**:
	- Opción 2 — Built-in con Nodemon:
		```powershell
		    npm run dev
		```