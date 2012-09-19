var mines = new Mines();
mines.createField(5, 5);


test("Method: get", function () {
	equal(mines.get('fieldX'), 5, "Largura correta");
	equal(mines.get('fieldY'), 5, "Altura igual");
	equal(mines.get('campoInexistente'), false, "Campo inexistente retorna false");
});


test("Check field object", function () {
	var x = 5, y = 5	
	
	function assertFieldSize () { 
		var total = 0;
		
		for (var i = 0; i < mines.field.length; i++) {
			for (var j = 0; j < mines.field[i].length; j++) {
				total++;
			}
		}
		
		return total;
	}
	
	equal((mines.get('fieldX') * mines.get('fieldY')), (x*y), "fields created");
	equal(mines.field.length, 5, 'O tamanho eh cinco');
	equal(mines.field[0].length, 5, 'A largura eh cinco');
	equal(assertFieldSize(), 25, 'functionou o tamanho total'); 
});

test("check bombs", function () {
	cl('mines', mines);
	mines.plantBombs(5);
	function checkBombs(){
		var bombs = 0;
		
		for (var i = 0; i < mines.field.length; i++) {
			for (var j = 0; j < mines.field[i].length; j++) {
				if(mines.field[i][j] == '*') {
					bombs++;
				}
			}
		}
		return bombs;
	}
	
	equal(checkBombs(), 5, 'Count bombs ok!'); 
	
});