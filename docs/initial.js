// Criando uma nova imagem
var img = new Image();
img.src = "meteor_challenge_01.png";

img.onload = function() {
    // Transformando a imagem em um canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // Coletando dados de tamanho da imagem
    canvas.width = img.width;
    canvas.height = img.height;
    // Desenhando a imagem 
    ctx.drawImage(img, 0, 0);
    // Coletando os dados do canva criado
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    // Converte os dados dos pixels em uma matriz de duas dimensões
    var matriz = [];
    for (let i = 0; i < pixels.length; i += 4) {
        var pixel = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
        matriz.push(pixel);
    }

    var matriz_n = [];
    for(let y = 0; y < canvas.height; y++) {
        let linha = [];

        for(let x = 0; x < canvas.width; x++) {
            const indice = (y * canvas.width + x) * 4;
            const rgba = [pixels[indice], pixels[indice+1], pixels[indice+2], pixels[indice+3]]
            linha.push(rgba);
        }

        matriz_n.push(linha);
    }


    var color_chart = [];
    var color_repeater = [];
    for (let i = 0; i < matriz.length; i++) {
        // Crio um novo Set de cores
        color = [];

        // Preencho as cores no Set
        for(let j = 0; j < matriz[i].length; j++) {
            color.push(matriz[i][j])
        }

        // Verifico se há color_chart comparável
        if(color_chart.length > 0) {
            let repete = false;

            for(let c = 0; c < color_chart.length; c++) {
                if(compareArray(color, color_chart[c])) {
                    repete = true;
                    color_repeater[c] += 1;
                }
            }

            if(!(repete)) {
                color_chart.push(color);
                color_repeater.push(1);
                // console.log(`Cor Nova: ${i}, ${matriz[i]}`);
            }
        } else {
            color_chart.push(color)
            color_repeater.push(1);
        }
    }

    console.log(color_chart);
    console.log(color_repeater);    

    white_stars = [];
    red_meteors = [];
    for(let i = 0; i < 704; i++) {
        for(let j = 0; j < 704; j++) {
            if(compareArray(matriz_n[i][j], color_chart[1])) {
                white_stars.push([i,j])
            }
            if(compareArray(matriz_n[i][j], color_chart[2])) {
                red_meteors.push([i,j])
            }
        }
    }

    console.log(white_stars)
    console.log(red_meteors);
    meteor_in_water = [];

        //matriz[108]
    for(let i = 0; i < red_meteors.length; i++) {
        x = red_meteors[i][1]
        y = red_meteors[i][0]

        height_start = y;
        while(height_start < matriz_n.length) {
            cor_percorrida = matriz_n[height_start][x];

            if(compareArray(cor_percorrida,color_chart[108])) {
                //console.log(`Água em ${cor_percorrida} de height=${height_start}, width=${x}`);
                meteor_in_water.push([height_start, x]);
                ctx.fillStyle = 'green'
                ctx.fillRect(x, y+1, 1, height_start-y);
                
                break;
            }

            height_start++;
        }
    }

    console.log(meteor_in_water);
    var color_canvas = document.getElementById("colors");
    var color_context = color_canvas.getContext("2d");

    color_canvas.width = 200;
    color_canvas.height = color_chart.length*3;
    // Desenhando a imagem 
    for(let i = 0; i < color_chart.length; i++) {
        const array_rgba = (array) => {
            return `rgba(${array[0]},${array[1]},${array[2]},${array[3]})`
        };

        color = array_rgba(color_chart[i])
        color_context.fillStyle = color
        color_context.fillRect(0, i*3, 200, 3)
    }
};

function compareArray(a, b) {
    return a.toString() === b.toString();
}

function getColorFromCoordinate(x, y, width) {
    const pixel = y * (width * 4) + x * 4;
    return [pixel, pixel+1, pixel+2, pixel+3];
}


// function cor_existente(cor, color_chart) {
//     const compareArrays = (a,b) => {
//         return a.toString() === b.toString();
//     };

//     for(let i = 0; i < color_chart.length; i++) {
//         if(compareArrays(color_chart[i],color)) {
//             return true;
//         }
//     }

//     return false;
// } 