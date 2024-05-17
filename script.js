// Carregando a Imagem
var img = new Image();
img.src = 'docs/meteor_challenge_01.png';
// Criando a Imagem para Análise
img.onload = function() {
    // Canvas e Dados da Imagem
    let image_canvas = document.getElementById("canvas");
    let image_context = canvas.getContext("2d");

    image_canvas.width = img.width;
    image_canvas.height = img.height;

    image_context.drawImage(img, 0, 0)

    image_matrix = imageArray(image_canvas, image_context);
    // Cores de Estrelas e Meteoros
    let white = [255, 255, 255, 255];   // rgba(255,255,255,255)    - Branco
    let red   = [255,0,0,255];          // rgba(255,0,0,255)        - Vermelho
    let blue  = [0,0,255,255];          // rgba(0,0,255,255)        - Azul
    // Encontrando as Estrelas, Meteoros e Água
    let white_stars = [];
    let red_meteors = [];
    let water = [];

    for(let i = 0; i < image_matrix.length; i++) {
        for(let j = 0; j < image_matrix.length; j++) {
            if(compareArray(image_matrix[i][j], white)) {
                white_stars.push([i,j]);
            }
            if(compareArray(image_matrix[i][j], red)) {
                red_meteors.push([i,j]);
            }
            if(compareArray(image_matrix[i][j], blue)) {
                water.push([i,j]);
            }
        }
    }

    // Verificando quais meteoros vão cair na água
    let meteor_in_water = [];
    for(let i = 0; i < red_meteors.length; i++) {
        if(water.some(water_coord => water_coord[1] == red_meteors[i][1])) {
            meteor_in_water.push(red_meteors[i])
        }
    }

    console.log(`Número de Estrelas: ${white_stars.length}`)
    console.log(`Número de Meteoros: ${red_meteors.length}`)
    console.log(`Meteoros Caindo na Água: ${meteor_in_water.length}`)

    /* Variáveis e Valores
        Estrelas: white_stars
        Meteoros: red_meteors
        Meteoros perpendiculares a água: meteor_in_water
    */
}
// Coleta Dados da Imagem
function imageArray(canvas, context) {
    var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

    var image_matrix = [];
    for(let y = 0; y < canvas.height; y++) {
        let line = [];
        for(let x = 0; x < canvas.width; x++) {
            let index = (y * canvas.width + x) * 4;
            let row = [pixels[index], pixels[index+1], pixels[index+2], pixels[index+3]];
            line.push(row);
        }
        image_matrix.push(line);
    }

    return image_matrix;
}
// Utils
function compareArray(a, b) {
    return a.toString() === b.toString();
}
