class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      rocket1 = createSprite(100,200);
      rocket1.addImage("rocket1",rocket1_img);
      rocket1.scale = 0.1
      rocket2 = createSprite(300,200);
      rocket2.addImage("rocket2",rocket2_img);
      rocket2.scale = 0.1
      rocket3 = createSprite(500,200);
      rocket3.addImage("rocket3",rocket3_img);
      rocket3.scale = 0.1
      rocket4 = createSprite(700,200);
      rocket4.addImage("rocket4",rocket4_img);
      rocket4.scale = 0.1
      rockets = [rocket1, rocket2, rocket3, rocket4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getCarAtEnd()
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the rockets
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the rockets a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the rockets in y direction
          y = displayHeight - allPlayers[plr].distance;
          rockets[index-1].x = x;
          rockets[index-1].y = y;
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            rockets[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = rockets[index-1].y;
          }
         
         // textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, camera.position.x, camera.position.y)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 4100){
        gameState = 2;
        player.rank+=1
        Player.updateRank(player.rank)
        textSize(100)
  fill("red")
       text("rank: "+player.rank, camera.position.x, camera.position.y-100)
     
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank)
    }
  }
  