# Proyecto SEGEPLAN - Integración de IA con React + Vite

Este proyecto tiene como objetivo desarrollar cinco prototipos que integren inteligencia artificial utilizando la API de OpenAI. Cada módulo está diseñado para optimizar tareas clave dentro de SEGEPLAN, proporcionando asistencia en generación de documentos, análisis de expedientes, evaluación de políticas públicas, ciencia de datos y análisis de prospectiva estratégica.

## 🛠 Tecnologías Utilizadas

- **React + Vite**: Framework y herramienta de construcción rápida para interfaces web.
- **API de OpenAI**: Para generación y análisis de textos mediante IA.
- **Bootstrap**: Para el diseño y la UI responsiva.
- **React Router**: Para gestionar la navegación entre los prototipos.

## 📌 Instalación y Configuración

### 1️⃣ Clonar el Repositorio
```bash
 git clone https://github.com/RedCiudadana/IA-SEGEPLAN-REACT
 cd proyecto-segeplan
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y añade tu clave de la API de OpenAI:
```env
VITE_OPENAI_API_KEY=tu_clave_aqui
```

### 4️⃣ Iniciar el Proyecto
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173/`.

## 📢 Descripción de los Prototipos

### **1️⃣ Asistentes Virtuales de IA**
- Permite generar documentos, analizar expedientes y evaluar políticas públicas.
- Los usuarios ingresan un prompt bien estructurado y obtienen resultados generados por IA.
- Incluye ejemplos de prompts para optimizar las solicitudes.

### **2️⃣ Análisis de Expedientes**
- Analiza expedientes de proyectos de inversión pública.
- Identifica criterios clave y genera resúmenes con riesgos y recomendaciones.
- Admite archivos en formatos PDF, Word y Excel.

### **3️⃣ Análisis de Políticas Públicas**
- Evalúa políticas públicas identificando fortalezas y áreas de mejora.
- Compara con modelos internacionales y proporciona recomendaciones.
- Genera informes ejecutivos con visualizaciones clave.

### **4️⃣ Data Science**
- Utiliza técnicas de ciencia de datos para analizar tendencias en inversión y planificación.
- Extrae insights a partir de grandes volúmenes de datos.
- Genera gráficos y modelos predictivos para optimizar la toma de decisiones.

### **5️⃣ Análisis de Prospección**
- Evalúa escenarios futuros y proyecciones estratégicas en planificación pública.
- Genera escenarios posibles y tendencias futuras.
- Permite visualizar modelos predictivos y descargar informes con recomendaciones.

## 🔗 API de OpenAI - Implementación
El proyecto hace uso de la API de OpenAI para procesar datos y generar análisis.

## 📂 Estructura del Proyecto
```
📦 proyecto-segeplan
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 pages
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 main.jsx
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 📌 Consideraciones Finales
- **Supervisión Humana Requerida**: La IA es una herramienta de apoyo. Siempre revisa los resultados antes de su uso oficial.
- **Mejoras Futuras**: Se planea integrar bases de datos y mejorar la personalización de los resultados de IA.

📢 ¡Gracias por contribuir a este proyecto! 😊

