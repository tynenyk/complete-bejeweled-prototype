var gemIdPrefix = "gem";
var numRows = 6;
var numCols = 7;
var selectedRow = -1;
var selectedCol = -1;
var posX;
var posY;
var jewels = new Array();
var movingItems = 0;
var gameState = "pick";
var swiped = false;
var swipeStart = null;
var bgColors = new Array("magenta", "mediumblue", "yellow", "lime", "cyan", "orange", "crimson", "gray");
$("body").append('<div id = "marker"></div><div id = "gamefield"></div>').css({
	"background-color": "black",
	"margin": "0"
});
$("#gamefield").css({
	"background-color": "#000000",
	"width": (numCols * gemSize) + "px",
	"height": (numRows * gemSize) + "px"
});
$("#marker").css({
	"width": (gemSize - 10) + "px",
	"height": (gemSize - 10) + "px",
	"border": "5px solid white",
	"position": "absolute"
}).hide();
for(i = 0; i < numRows; i++){
	jewels[i] = new Array();
	for(j = 0; j < numCols; j++){
		jewels[i][j] = -1;
	}
}
for(i = 0; i < numRows; i++){
	for(j = 0; j < numCols; j++){
		do{
			jewels[i][j] = Math.floor(Math.random() * 8);
		} while(isStreak(i,j));
		$("#gamefield").append('<div class = "' + gemClass + '" id = "' + gemIdPrefix + '_' + i + '_' + j + '"></div>');
		$("#" + gemIdPrefix + "_" + i + "_" + j).css({
			"top": (i * gemSize) + 4 + "px",
			"left": (j * gemSize) + 4 + "px",
			"width": "54px",
			"height": "54px",
			"position": "absolute",
			"border": "1px solid white",
			"cursor": "pointer",
			"background-color": bgColors[jewels[i][j]]
		});
	}
}

$("#gamefield").swipe({
	threshold: 10,
	tap:function(event, target){
		if($(target).hasClass("gem")){
			if(gameState == "pick"){
				var row = parseInt($(target).attr("id").split("_")[1]);
				var col = parseInt($(target).attr("id").split("_")[2]);
				$("#marker").show();
				$("#marker").css("top", row * gemSize).css("left", col * gemSize);
				if(selectedRow == -1){
					selectedRow = row;
					selectedCol = col;
				}
				else{
					if((Math.abs(selectedRow - row) == 1 && selectedCol == col) || (Math.abs(selectedCol - col) == 1 && selectedRow == row)){
						$("#marker").hide();
						gameState = "switch";
						posX = col;
						posY = row;
						gemSwitch();
					}
					else{
						selectedRow = row;
						selectedCol = col;
					}
				}
			}
		}
	},
	swipe: function(event, direction){
		if(swipeStart != null){
			if(gameState == "pick"){
				selectedRow = parseInt($(swipeStart).attr("id").split("_")[1]);
				selectedCol = parseInt($(swipeStart).attr("id").split("_")[2]);
				switch(direction){
					case "up":
						if(selectedRow > 0){
							$("#marker").hide();
							gameState = "switch";
							posX = selectedCol;
							posY = selectedRow -1;
							gemSwitch();
						}
						break;
					case"down":
						if(selectedRow < numRows - 1){
							$("#marker").hide();
							gameState = "switch";
							posX = selectedCol;
							posY = selectedRow + 1;
							gemSwitch();
						}
						break;
					case"left":	
				}
			}
		}
	}
})