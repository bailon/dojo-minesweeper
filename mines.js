var cl = function() {
	if (console) {
		for (var i in arguments) {
			console.log(arguments[i]);
		}
	}
}

var Mines = function () {
	var field = [],
		div = null,
		bombs = [],
		bombsNeighbors = [],
		fieldX = 0,
		fieldY = 0;
		
	get = function (param) {
		try {
			var value = eval(param);
			return eval(param);
		} catch (e) {
			return false;
		}
	},

	

	write = function (id, show) {
		div = window.document.getElementById(id);
		div.innerHTML = "";
		var show = show || false;
		
		for (var i = 0; i < field.length; i++) {
			var line = field[i];
			for (var j = 0; j < line.length; j++) {
				var content = div.innerHTML;
				var coordinates = {x:i, y:j}
				var childDiv = writeField(line[j], show, coordinates);
				div.appendChild(childDiv);
								
				if (j == line.length - 1) {
					childDiv.className += ' last-col';
				}
				//div.innerHTML = content;
				if (i == field.length - 1) {
					childDiv.className += ' last-row';
				}
			}
			
			
			
			div.appendChild(createBreakSpan());
	//		var content = div.innerHTML;
			//div.appendChild('<span class="break"><!-- --></span>');
			//div.innerHTML = content;
		}
		
		return this;
	};
	
	createBreakSpan = function() {
		var elem = document.createElement('span');
		elem.className = 'break';
		return elem;
	};
	
	setNeighbors = function(x,y){
	var posX, posY;
	
		for (var i = -1; i <= 1; i++) {
			posX = x + i;
			for (var j = -1; j <= 1; j++) {
				posY = y + j;
				
				if((posX < fieldX && posX >= 0) && (posY < fieldY && posY >= 0) && field[posX][posY].value != '*') {
					field[posX][posY].value++
			
				}
			}
		}

		return this;
	};
	
	checkNeighborsByValue = function(coordinates, value){
		var neighbors = [];
		//field[coordinates.x][coordinates.y].elem.innerHTML = value;
		for (var i = -1; i <= 1; i++) {
			posX = coordinates.x + i;
			for (var j = -1; j <= 1; j++) {
				posY = coordinates.y + j;
				
				if((posX < fieldX && posX >= 0) && (posY < fieldY && posY >= 0) && field[posX][posY].value != '*' && field[posX][posY].clicked == false) {
					field[posX][posY].elem.innerHTML = field[posX][posY].value;
					field[posX][posY].clicked = true;
					field[posX][posY].elem.className += ' field-clicked';
					if (field[posX][posY].value == 0) {
						var neighborCoordinates = {x:posX, y:posY}
						checkNeighborsByValue(neighborCoordinates, value);
					}
				}
			}
		}
		
		return this;
	};
	
	
	writeField = function (field, show, coordinates) {
		var elem =  document.createElement('div');
		elem.className = 'field-area';
		elem.onclick = function(){
			field.clicked = true;
			checkField(field.value, elem, coordinates);
			this.className += ' field-clicked';
		}
		field.elem = elem;
		if (show) elem.innerHTML = field.value;
		return elem ;
		//elem.class = 'field-area';
		//return elem.html;
	};
	
	
	checkField = function(field, elem, coordinates) {
		switch (field) {
			case '*' :
				write('result', true);
				alert('BOOM');
				break;
			case 0 :
				elem.innerHTML = '0';
				checkZero(coordinates);
				break;
			default :
				elem.className += ' field-clicked';
				elem.innerHTML = field;
				break;
		}
	};
	
	checkZero = function (coordinates) {
		checkNeighborsByValue(coordinates, '0');
	};
	
	createField = function (m, n) {
		cl('b', fieldX, fieldY);	
		fieldX = m;
		fieldY = n;
		cl('a', fieldX, fieldY);	
		
		for (var i = 0; i < m; i++) {
			field.push([]);
			bombsNeighbors.push([]);
			for (var j = 0; j < n; j++) {
				var quadrant = {value:0, clicked: false}
				field[i].push(quadrant);
				bombsNeighbors[i].push(quadrant);
			}
		}
		
		cl('bombsNeighbors', bombsNeighbors);
		cl('createField', field);
		
		return this;
	};
	
	plantBombs = function (n) {
		cl('plantBombs', field, n);
		
		var i = 0;
		
		while (i < n) {
			var x = Math.round(Math.random()*(field.length - 1));
			var y = Math.round(Math.random()*(field.length - 1));
			if(field[x][y].value != '*') {
				i++;
				field[x][y].value = '*';
				setNeighbors(x, y);
				
			} else {
				cl('duplicate');
			}
		}
		//cl(cl(field);
		
		return this;
	};
	
	
	return {
		createField	: createField,
		write		: write,
		plantBombs	: plantBombs,
		field		: field,
		get 		: get
	};
};