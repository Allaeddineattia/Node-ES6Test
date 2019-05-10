const Level3=require("../third")
test('it should test refactorBrazilianMandatory',()=>{
    let instance= new Level3();
    expect(instance.checkLine("Emplacement: Space Exploration Technologies Corp. - CNPJ: 99.999.999/9999-99")).toBe(false)
    expect(instance.checkLine("1	*** Ativo ***	82997,66	D		247726,89	240377,5		90347,05	D")).toBe(true)
    expect(instance.checkLine("																										")).toBe(false)
    expect(instance.checkLine(" 1.1				     Ativo Circulante							130.288,57D		527.081,41					464.716,15			192.653,83D					")).toBe(true)
    expect(instance.checkLine("100000  ATIVO             1000  300   500   1200")).toBe(true)
})

test('it sould test getParent',()=>{
    let instance= new Level3();
    expect(instance.getParent("110000")).toBe("100000")
    expect(instance.getParent("111000")).toBe("110000")
    expect(instance.getParent("31110")).toBe('311000')

})

test('it should test reShapeDescription',()=>{
    let instance= new Level3();
    expect(instance.reShapeDescription("hey_you")).toBe("hey you")
    expect(instance.reShapeDescription("_hey_yo_u_")).toBe(" hey yo u ")

})

test('it should test reShapeLine',()=>{
    let instance= new Level3();
    expect(instance.reShapeLine("11304	Cartão de Crédito	6420,06	D		38956,9	43635,46		1741,5	D"))
    .toBe("11304	Cartão_de_Crédito	6420,06	38956,9	43635,46		1741,5	D")
    expect(instance.reShapeLine("Bradesco Conta Poupanca: 9999999-9")).toBe("Bradesco_Conta_Poupanca:_9999999-9")
    expect(instance.reShapeLine("*** Passivo ***")).toBe(" Passivo ")
    expect(instance.reShapeLine("Depósitos Bancários à Vista")).toBe("Depósitos_Bancários_à_Vista")
})

test('it should test refactorBrazilianMandatory',()=>{
    let instance= new Level3();
    expect(instance.refactorBrazilianMandatory("1.596,58D")).toBe(1596.58)
    expect(instance.refactorBrazilianMandatory("1.596.896,58D")).toBe(1596896.58)
    expect(instance.refactorBrazilianMandatory("843,6")).toBe(843.6)
    expect(instance.refactorBrazilianMandatory("843")).toBe(843)
})

test('it should test refactorFileIntoObjects',()=>{
    let instance= new Level3('input1');
    expect(instance.refactorFileIntoObjects()).toEqual([{
        description: 'ATIVO', // string
        classifier: '100000',      // string
        openingBalance: 1000, // number
        debit: 300,           // number
        credit: 500,          // number
        finalBalance: 1200,   // number
        parent: null          // null or string of the parent classifier
      }, {
        description: 'ATIVO CIRCULANTE',  // string
        classifier: '110000',                 // string
        openingBalance: 500,              // number
        debit: 100,                       // number
        credit: 200,                      // number
        finalBalance: 600,                // number
        parent: '100000'                       // null || string
      }, {
        description: 'DISPONIVEL',  // string
        classifier: '111000',          // string
        openingBalance: 200,        // number
        debit: 100,                 // number
        credit: 50,                 // number
        finalBalance: 150,          // number
        parent: '110000'                // null || string
      }, {
        description: 'PASSIVO', // string
        classifier: '200000',        // string
        openingBalance: 800,    // number
        debit: 250,             // number
        credit: 450,            // number
        finalBalance: 1000,     // number
        parent: null            // null || string
      }])

})