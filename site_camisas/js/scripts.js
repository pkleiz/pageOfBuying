var camisetas = {
  branca: {
    gola_v: {
      sem_estampa: {
        preco_unit: 5.12,
        foto: "v-white.jpg",
      },
      com_estampa: {
        preco_unit: 8.95,
        foto: "v-white-personalized.jpg",
      },
    },

    gola_normal: {
      sem_estampa: {
        preco_unit: 4.99,
        foto: "normal-white.jpg",
      },
      com_estampa: {
        preco_unit: 8.77,
        foto: "normal-white-personalized.jpg",
      },
    },
  },

  colorida: {
    gola_v: {
      sem_estampa: {
        preco_unit: 6.04,
        foto: "v-color.jpg",
      },
      com_estampa: {
        preco_unit: 9.47,
        foto: "v-color-personalized.png",
      },
    },

    gola_normal: {
      sem_estampa: {
        preco_unit: 5.35,
        foto: "normal-color.jpg",
      },
      com_estampa: {
        preco_unit: 9.28,
        foto: "normal-color-personalized.jpg",
      },
    },
  },
};

// parâmetros da pesquisa

var parametros_pesquisa = {
  quantidade: 10,
  cor: "colorida",
  gola: "gola_v",
  qualidade: "q150",
  estampa: "com_estampa",
  embalagem: "bulk",
};

// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo:
// faixa 1: acima de 1.000 - Desconto de 15%
// faixa 2: acima de 500 - Desconto de 10%
// faixa 3: acima de 100 - Desconto de 5%

// Resolução do desafio:

$(function () {
  function setInicialValuesToSearchParameters() {
    if (localStorage.quantity) {
      parametros_pesquisa.quantidade = window.localStorage.quantity;
    }
    if (localStorage.color) {
      parametros_pesquisa.cor = window.localStorage.color;
    }
    if (localStorage.collar) {
      parametros_pesquisa.gola = window.localStorage.collar;
    }
    if (localStorage.quality) {
      parametros_pesquisa.qualidade = window.localStorage.quality;
    }
    if (localStorage.print) {
      parametros_pesquisa.estampa = window.localStorage.print;
    }
    if (localStorage.packing) {
      parametros_pesquisa.embalagem = window.localStorage.packing;
    }
  }

  function saveToLocalStorage(nameLocalStorage, nameSearchParameters) {
    if (window.localStorage[nameLocalStorage]) {
      if (
        localStorage[nameLocalStorage] !==
        parametros_pesquisa[nameSearchParameters]
      ) {
        window.localStorage.setItem(
          nameLocalStorage,
          parametros_pesquisa[nameSearchParameters]
        );
      }
    } else {
      window.localStorage.setItem(
        nameLocalStorage,
        parametros_pesquisa[nameSearchParameters]
      );
    }
  }

  function quantity() {
    $("#quantidade").change(function () {
      parametros_pesquisa.quantidade = $("#quantidade").val();
      saveToLocalStorage("quantity", "quantidade");
      setInformationsOnDetails();
    });
  }
  function colorOfShirt() {
    $("#branca").click(function () {
      $("#branca").addClass("selected");
      $("#colorida").removeClass("selected");
      parametros_pesquisa.cor = "branca";
      setInformationsOnDetails();
      saveToLocalStorage("color", "cor");
    });
    $("#colorida").click(function () {
      $("#colorida").addClass("selected");
      $("#branca").removeClass("selected");
      parametros_pesquisa.cor = "colorida";
      setInformationsOnDetails();
      saveToLocalStorage("color", "cor");
    });
  }
  function typeOfCollar() {
    $("#gola_v").click(function () {
      $("#gola_v").addClass("selected");
      $("#gola_normal").removeClass("selected");
      parametros_pesquisa.gola = "gola_v";
      setInformationsOnDetails();
      saveToLocalStorage("collar", "gola");
    });
    $("#gola_normal").click(function () {
      $("#gola_normal").addClass("selected");
      $("#gola_v").removeClass("selected");
      parametros_pesquisa.gola = "gola_normal";
      setInformationsOnDetails();
      saveToLocalStorage("collar", "gola");
    });
  }
  function typeOfQuality() {
    $("#q150").click(function () {
      $("#q150").addClass("selected");
      $("#q190").removeClass("selected");
      parametros_pesquisa.qualidade = "q150";
      setInformationsOnDetails();
      saveToLocalStorage("quality", "qualidade");
    });
    $("#q190").click(function () {
      $("#q190").addClass("selected");
      $("#q150").removeClass("selected");
      parametros_pesquisa.qualidade = "q190";
      setInformationsOnDetails();
      saveToLocalStorage("quality", "qualidade");
    });
  }
  function typeOfPrint() {
    $("#estampa").change(function () {
      parametros_pesquisa.estampa = $("#estampa").find(":selected").val();
      setInformationsOnDetails();
      saveToLocalStorage("print", "estampa");
    });
  }

  function typeOfPacking() {
    $("#embalagem").change(function () {
      parametros_pesquisa.embalagem = $("#embalagem").find(":selected").val();
      setInformationsOnDetails();
      saveToLocalStorage("packing", "embalagem");
    });
  }

  function setActualImage() {
    return camisetas[
      parametros_pesquisa.cor
    ][parametros_pesquisa.gola][parametros_pesquisa.estampa].foto;
  }

  function setTotalPrice() {
    return (
      camisetas[parametros_pesquisa.cor][parametros_pesquisa.gola][
        parametros_pesquisa.estampa
      ].preco_unit * parametros_pesquisa.quantidade
    ).toFixed(2);
  }

  function setInitialInformationsOnMenu() {
    setInicialValuesToSearchParameters();
    $("#quantidade").attr("value", parseInt(parametros_pesquisa.quantidade));

    if (parametros_pesquisa.cor == "branca") {
      $("#branca").addClass("selected");
      $("#colorida").removeClass("selected");
    } else {
      $("#colorida").addClass("selected");
      $("#branca").removeClass("selected");
    }
    if (parametros_pesquisa.gola == "gola_v") {
      $("#gola_v").addClass("selected");
      $("#gola_normal").removeClass("selected");
    } else {
      $("#gola_normal").addClass("selected");
      $("#gola_v").removeClass("selected");
    }
    if (parametros_pesquisa.qualidade == "q150") {
      $("#q150").addClass("selected");
      $("#q190").removeClass("selected");
    } else {
      $("#q190").addClass("selected");
      $("#q150").removeClass("selected");
    }

    $("#estampa").val(parametros_pesquisa.estampa);

    $("#embalagem").val(parametros_pesquisa.embalagem);
  }

  function setInformationsOnDetails() {
    $(".refresh-loader").css("display", "initial");
    discount();

    setDiscountOnHTML();

    $("#result_quantidade").html(parametros_pesquisa.quantidade);

    if (parametros_pesquisa.cor == "branca") {
      $("#result_cor").html("Branca");
    } else {
      $("#result_cor").html("Colorida");
    }

    if (parametros_pesquisa.gola == "gola_v") {
      $("#result_gola").html("Gola V");
    } else {
      $("#result_gola").html("Gola Normal");
    }

    if (parametros_pesquisa.qualidade == "q150") {
      $("#result_qualidade").html("Normal (150g/m2)");
    } else {
      $("#result_qualidade").html("Alta (190g/m2)");
    }

    if (parametros_pesquisa.estampa == "com_estampa") {
      $("#result_estampa").html("Com Estampa");
    } else {
      $("#result_estampa").html("Sem Estampa");
    }
    if (parametros_pesquisa.embalagem == "bulk") {
      $("#result_embalagem").html("Bulk - Sem Plástico");
    } else {
      $("#result_embalagem").html("Unitária - Plástico");
    }

    $("#foto-produto").attr("src", "img/" + setActualImage());

    let priceWithAdjusts = parseFloat(setTotalPrice());
    if (parametros_pesquisa.qualidade == "q190") {
      priceWithAdjusts = priceWithAdjusts * 1.12;
    }
    if (parametros_pesquisa.embalagem == "unitaria") {
      priceWithAdjusts =
        priceWithAdjusts + parametros_pesquisa.quantidade * 0.15;
    }

    if (
      parametros_pesquisa.quantidade > 100 &&
      parametros_pesquisa.quantidade < 501
    ) {
      priceWithAdjusts = priceWithAdjusts - priceWithAdjusts * 0.05;
    }
    if (
      parametros_pesquisa.quantidade > 500 &&
      parametros_pesquisa.quantidade < 1001
    ) {
      priceWithAdjusts = priceWithAdjusts - priceWithAdjusts * 0.1;
    }
    if (parametros_pesquisa.quantidade > 1000) {
      priceWithAdjusts = priceWithAdjusts - priceWithAdjusts * 0.15;
    }

    $("#valor-total").html(priceWithAdjusts.toFixed(2));
    // verifyAndSaveLocalStorage();

    window.setTimeout(function () {
      $(".refresh-loader").css("display", "none");
    }, 300);
  }

  function setDiscountOnHTML() {
    if (parametros_pesquisa.quantidade > 100) {
      let valWithoutDiscount = (
        camisetas[parametros_pesquisa.cor][parametros_pesquisa.gola][
          parametros_pesquisa.estampa
        ].preco_unit * parametros_pesquisa.quantidade
      ).toFixed(2);

      if (parametros_pesquisa.qualidade == "q190") {
        valWithoutDiscount = (parseFloat(valWithoutDiscount) * 1.12).toFixed(2);
      }

      if (parametros_pesquisa.embalagem == "unitaria") {
        valWithoutDiscount = (
          parseFloat(valWithoutDiscount) +
          0.15 * parseFloat(valWithoutDiscount)
        ).toFixed(2);
      }
      $("#discountValue")
        .html(" " + valWithoutDiscount)
        .addClass("price-formatating");
    } else {
      $("#discountValue").html("");
    }
  }

  function discount() {
    $("#percentDiscountApplied").css({
      color: "#9f9f9f",
      "font-size": "12px",
    });
    if (parametros_pesquisa.quantidade > 100) {
      $("#percentDiscountApplied").html(
        "5% de desconto aplicado a essa compra"
      );
    }
    if (parametros_pesquisa.quantidade > 500) {
      $("#percentDiscountApplied").html(
        "10% de desconto aplicado a essa compra"
      );
    }
    if (parametros_pesquisa.quantidade > 1000) {
      $("#percentDiscountApplied").html(
        "15% de desconto aplicado a essa compra"
      );
    }
    if (parametros_pesquisa.quantidade < 101) {
      $("#percentDiscountApplied").html("");
    }
  }

  function main() {
    setInitialInformationsOnMenu();
    quantity();
    colorOfShirt();
    typeOfCollar();
    typeOfQuality();
    typeOfPrint();
    typeOfPacking();
    setInformationsOnDetails();
  }
  main();
});

// Sugestão de etapas da resolução

// 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o
// valor no console para testar se está certo.

// 2. Faça os eventos click e change para os filtros.

// a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click,
// remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
// que ele fique azul.

// b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

// c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para
// calcular o preço

// 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
// nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento
// "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

// 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço.
// Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout
// para deixar ele aparecer por pelo menos 2 segundos.

// 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage,
// atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço
