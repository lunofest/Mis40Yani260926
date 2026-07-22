// Cache-busting para scripts y estilos ya se maneja directamente en index.html
// con los parámetros ?v7 en cada etiqueta <script> y <link>.
// Esta función actualiza las imágenes con un timestamp para evitar que
// el browser sirva imágenes viejas desde caché.
function actualizarImagenes() {
    var ts = new Date().getTime();
    document.querySelectorAll('img').forEach(function(img) {
        var src = img.getAttribute('src');
        if (src && !src.startsWith('http')) {
            img.setAttribute('src', src.split('?')[0] + '?v=' + ts);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    actualizarImagenes();
});



/*function cargarRecursos(recursos, version) {
    recursos.forEach(function (recurso) {
        var urlActualizada = recurso + '?v' + version;
        var elementos = document.querySelectorAll('[href="' + recurso + '"], [src="' + recurso + '"]');
        elementos.forEach(function (elemento) {
            if (elemento.tagName === 'SCRIPT') {
                var nuevoScript = document.createElement('script');
                nuevoScript.src = urlActualizada;
                nuevoScript.onload = function () {
                    elemento.parentNode.replaceChild(nuevoScript, elemento);
                };
                document.head.appendChild(nuevoScript);
            } else if (elemento.tagName === 'LINK') {
                var nuevaHojaEstilos = document.createElement('link');
                nuevaHojaEstilos.rel = 'stylesheet';
                nuevaHojaEstilos.href = urlActualizada;
                nuevaHojaEstilos.onload = function () {
                    elemento.parentNode.replaceChild(nuevaHojaEstilos, elemento);
                };
                document.head.appendChild(nuevaHojaEstilos);
            } else {
                elemento.src = urlActualizada;
            }
        });
    });
}

function forzarActualizacionCache() {
    var recursos = [
        'estilos/normalize.css?v145',
        'estilos/styles.css?v145',
        'estilos/mediaQueries.css?v145',
        'javascript/script.js?v145',
        'assets/imagenes?v145',
        'assets/imagenes/promo1.webp?v145',
        'assets/imagenes/promo2.webp?v145',
        'assets/imagenes/promo3.webp?v145',
        'assets/imagenes/promo4.webp?v145',
        'assets/imagenes/promo5.webp?v145',
        'assets/imagenes/promo6.webp?v145',
        'assets/imagenes/promo7.webp?v145',
        'assets/vectores?v145',
      // Add the URLs of your resources here
    ];
    var version = '?v145'; // Use a static or manually managed version
    cargarRecursos(recursos, version);
}

document.addEventListener('DOMContentLoaded', (event) => {
    forzarActualizacionCache();
});*/
