var stage; // 遊戲整體
var queue; // 載入資源的queue
var preloader; // 載入時的進度條
var spritesheet1, spritesheet2; // json1, json2
var rate; // 計算生成物件的次數，用來逐個顯現物件
///////////////////////////////////////////////////////////////////////////////////////////////
var menutopic, menustart, menuintroduce, goback, member; //json3, json4 , json5 , json6, json7
//////////////////////////////////////////////////////////////////////////////////////////////
// ----------------------------------------
var character1, character2; // 人物1、2
// ----------------------------------------
var attackImg1, attackImg2; // 攻擊物件圖片1、2
var attackContainer1, attackContainer2; // 攻擊物件1、2
// ----------------------------------------
var circleImg1, circleImg2; // 1/4圓
var arrowImg1, arrowImg2; // 指針
var windBar;
var arrowDirect1 = true, arrowDirect2 = true; // 指針判斷方向的依據
var protractorContainer1, protractorContainer2; // 三角器
// ----------------------------------------
var strengthBar1, strengthBar2; // 力量條1、2
// ----------------------------------------
var bloodBar1, bloodBar2;//生命條1、2
// ----------------------------------------
var totalWindPower = 20; // 最大風力
var totalHandPower = 70; // 人物最大力量
var strength1, strength2; // 攻擊物件1、2的飛行速度，會被角度分掉
// ----------------------------------------
var characterInitialCoordinateY = 450; // 人物初始Y座標
// ----------------------------------------
var gravity = 3.0; // 重力
// ----------------------------------------
var movingBoundary; // 人物中間障礙的座標，人物不可超過
var xVel = 5; // 每次X位移量
var wallImg; // 圍牆
//-----------------------------------------
////////////////////////////////////////////////////////////////////////////////
var soundID = "default"; // 讀取音樂
var soundName; //音樂名稱
var check = 0; //判斷開頭音樂
// ----------------------------------------
var EndGame1=0, EndGame2=0; // 判斷遊戲結束
var winImg1, winImg2, loseImg1, loseImg2; // 遊戲結束圖片
////////////////////////////////////////////////////////////////////////////////

/*----------------queue-------------------------------------
complete: fired when a queue completes loading all files
error: fired when the queue encounters an error with any file.
progress: Progress for the entire queue has changed.
fileload: A single file has completed loading.
fileprogress: Progress for a single file has changes. Note that only files loaded with XHR (or possibly by plugins) will fire progress events other than 0 or 100%.
-------------------------------------------------------------*/
// 提前載入
/////////////////////////////Music//////////////////////////////////////
// 播放讀取音樂
function handleFileLoad(event){
 createjs.Sound.play(event.src);
}
//選擇音樂撥放
function play(soundName){
 createjs.Sound.alternateExtensions = ["mp3"];
 createjs.Sound.addEventListener("fileload", handleFileLoad);
 createjs.Sound.registerSound("sound/" + soundName + ".mp3",soundID);
 createjs.Sound.play(soundID);
}
//選擇音樂停止
function stop(soundName){
  createjs.Sound.stop(soundID);
}
/////////////////////////////Music//////////////////////////////////////

/////////////////////////////Menu//////////////////////////////////////
//開始畫面
function Menu() {
  stop(soundName);
  check = 0;
  stage.removeChild(preloader);
  preloader = null;

  menustart = new createjs.SpriteSheet({
      "images": [queue.getResult("gameStart")],
      "frames": {"height": 69, "width": 199}
  });
  menuintroduce = new createjs.SpriteSheet({
      "images": [queue.getResult("introduce")],
      "frames": {"height": 69, "width": 199}
  });
  menutopic = new createjs.SpriteSheet({
      "images": [queue.getResult("topic")],
      "frames": {"height": 255, "width": 938}
  });
    rate = 0; // 計算生成物件的次數，用來逐個顯現物件
    loadimg();
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
   if(check==0){
      soundName = "menu";
      play(soundName);
   }
  }
//讀取開始畫面按鈕
function loadimg() {
  topicButton = new sprites.IntroduceMember(menutopic);
  topicButton.x = 215;
  topicButton.y = characterInitialCoordinateY/2-200;
  topicButton.alpha = 0; // 透明度為0
  createjs.Tween.get(topicButton).wait(500 + 150 * rate++).to({alpha:1}, 2000); // 浮現出來

  startButton = new sprites.StartMenu(menustart);
  startButton.x = 560;
  startButton.y = characterInitialCoordinateY/2+120;
  startButton.alpha = 0; // 透明度為0
  createjs.Tween.get(startButton).wait(500 + 150 * rate++).to({alpha:1}, 2000); // 浮現出來

  introduceButton = new sprites.IntroduceGame(menuintroduce);
  introduceButton.x = 560;
  introduceButton.y = characterInitialCoordinateY/2+220;
  introduceButton.alpha = 0; // 透明度為0
  createjs.Tween.get(introduceButton).wait(500 + 150 * rate).to({alpha:1}, 2000); // 浮現出來

  stage.addChild(startButton,introduceButton,topicButton);
}
/////////////////////////////Menu//////////////////////////////////////

///////////////////////////Introduce//////////////////////////////////
//遊戲介紹
function Introduce() {
  stage.removeChild(startButton,introduceButton,topicButton);
  startButton = null;
  introduceButton = null;
  topicButton = null;

  gameImg = new createjs.SpriteSheet({
      "images": [queue.getResult("introduceGame")],
      "frames": {"height": 465, "width": 926}
  });

  goback = new createjs.SpriteSheet({
      "images": [queue.getResult("goback")],
      "frames": {"height": 50, "width": 149}
  });

    rate = 0; // 計算生成物件的次數，用來逐個顯現物件
    loadimg_introduce();
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;

}
//讀取遊戲介紹畫面按鈕及圖片
function loadimg_introduce() {
  GameImg = new sprites.GoBack(gameImg);
  GameImg.x = 210;
  GameImg.y = 50;
  GameImg.alpha = 0; // 透明度為0
  createjs.Tween.get(GameImg).wait(500 + 150 * rate).to({alpha:1}, 1000); // 浮現出來

  gobackButton = new sprites.GoBack(goback);
  gobackButton.x = 580;
  gobackButton.y = 600;
  gobackButton.alpha = 0; // 透明度為0
  createjs.Tween.get(gobackButton).wait(500 + 150 * rate++).to({alpha:1}, 1000); // 浮現出來

  stage.addChild(GameImg,gobackButton);
}
///////////////////////////Introduce//////////////////////////////////
// 遊戲結束
function EndGame(){
     stop(soundName);
     soundName = "gameover";
     play(soundName);
     check = 0;
  goback = new createjs.SpriteSheet({
      "images": [queue.getResult("goback")],
      "frames": {"height": 50, "width": 149}
  });

    rate = 0; // 計算生成物件的次數，用來逐個顯現物件
    loadimg_EndGame();
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}
function loadimg_EndGame() {
  gobackButton = new sprites.GameOver(goback);
  gobackButton.x = 580;
  gobackButton.y = 600;
  gobackButton.alpha = 0; // 透明度為0
  createjs.Tween.get(gobackButton).wait(500 + 150 * rate++).to({alpha:1}, 1000); // 浮現出來
  var image1 = queue.getResult("win1");
  var image2 = queue.getResult("win2");
  var image3 = queue.getResult("lose1");
  var image4 = queue.getResult("lose2");
  winImg1 = new createjs.Bitmap(image1);
  winImg2 = new createjs.Bitmap(image2);
  loseImg1 = new createjs.Bitmap(image3);
  loseImg2 =new createjs.Bitmap(image4);
        if(EndGame2 == 10){
          winImg1.x = 0;
          winImg1.y = 324;
          winImg1.alpha = 0;
          winImg1.scaleX = 1;
          winImg1.scaleY = 1;
          loseImg2.x = 1090;
          loseImg2.y = 380;
          loseImg2.alpha = 0;
          loseImg2.scaleX = 1;
          loseImg2.scaleY = 1;
          createjs.Tween.get(winImg1).wait(500 + 150 * rate++).to({alpha:1.0}, 1000); // 浮現出來
          createjs.Tween.get(loseImg2).wait(500 + 150 * rate++).to({alpha:1.0}, 1000); // 浮現出來

          stage.addChild(winImg1, loseImg2);
        }else if(EndGame1 == 10){
          loseImg1.x = 0;
          loseImg1.y = 380;
          loseImg1.alpha = 0;
          loseImg1.scaleX = 1;
          loseImg1.scaleY = 1;
          winImg2.x = 1090;
          winImg2.y = 324;
          winImg2.alpha = 0;
          winImg2.scaleX = 1;
          winImg2.scaleY = 1;
          createjs.Tween.get(loseImg1).wait(500 + 150 * rate++).to({alpha:1.0}, 1000); // 浮現出來
          createjs.Tween.get(winImg2).wait(500 + 150 * rate++).to({alpha:1.0}, 1000); // 浮現出來
          stage.addChild(loseImg1, winImg2);
        }
        clearInterval(window.sprites.Character1.parameter.characterLoadInterval);
        clearInterval(window.sprites.Character2.parameter.characterLoadInterval);
        clearInterval(window.ui.Container.WindDirect.parameter.windBarLoadInterval);
        window.sprites.Character1.parameter.characterLoadInterval = null;
        window.sprites.Character2.parameter.characterLoadInterval = null;
        window.ui.Container.WindDirect.parameter.windBarLoadInterval = null;
  stage.addChild(gobackButton);
}
///////////////////////////Member//////////////////////////////////
//組員介紹
function Member() {
  stage.removeChild(startButton,introduceButton,topicButton);
  startButton = null;
  introduceButton = null;
  topicButton = null;

  member = new createjs.SpriteSheet({
      "images": [queue.getResult("member")],
      "frames": {"height": 480, "width": 934}
  });

  goback = new createjs.SpriteSheet({
      "images": [queue.getResult("goback")],
      "frames": {"height": 50, "width": 149}
  });

    rate = 0; // 計算生成物件的次數，用來逐個顯現物件
    loadimg_member();
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;

}
//讀取組員介紹畫面按鈕及圖片
function loadimg_member() {
  memberImg = new sprites.MemGoBack(member);
  memberImg.x = 210;
  memberImg.y = 50;
  memberImg.alpha = 0; // 透明度為0
  createjs.Tween.get(memberImg).wait(500 + 150 * rate).to({alpha:1}, 1000); // 浮現出來

  gobackButton = new sprites.MemGoBack(goback);
  gobackButton.x = 580;
  gobackButton.y = 600;
  gobackButton.alpha = 0; // 透明度為0
  createjs.Tween.get(gobackButton).wait(500 + 150 * rate).to({alpha:1}, 1000); // 浮現出來

  stage.addChild(memberImg,gobackButton);
}
///////////////////////////Member//////////////////////////////////
function preload() {
    queue = new createjs.LoadQueue();
    queue.loadManifest([
		{id:"character1", src:"img/character.png"},
        {id:"character2", src:"img/character.png"},
        {id:"dogbone", src:"img/dogbone.png"},
        {id:"can", src:"img/can.png"},
        {id:"fishbone", src:"img/fishbone.png"},
        {id:"circle", src:"img/circle.png"},
        {id:"circle2", src:"img/circle2.png"},
        {id:"arrow", src:"img/arrow.png"},
        {id:"wall1", src:"img/train1.png"},
        {id:"wall2", src:"img/train2.png"},
		   {id:"ground", src:"img/ground.png"},

        /////////////////////////////////////////////////
        {id:"gameStart", src:"img/start_Button.png"},
        {id:"introduce", src:"img/introduce_Button.png"},
        {id:"topic", src:"img/topic2.png"},
        {id:"goback", src:"img/goback_Button.png"},
        {id:"member", src:"img/member2.PNG"},
        {id:"introduceGame", src:"img/introduceGame.PNG"},
        {id:"menumusic", src:"sound/menu.mp3"},
        {id:"movemusic", src:"sound/movemusic.mp3"},
        {id:"backgroundmusic", src:"sound/backgroundmusic.mp3"},
        {id:"P1_attack_music", src:"sound/P1_attack.mp3"},
        {id:"P2_attack_music", src:"sound/P2_attack.mp3"},
        {id:"P1_Beattacked", src:"sound/P1_Beattacked.mp3"},
        {id:"P2_Beattacked", src:"sound/P2_Beattacked.mp3"},
        {id:"Ktrain", src:"sound/Ktrain.mp3"},
		{id:"gameover", src:"sound/gameover.mp3"},

        /////////////////////////////////////////////////
        {id:"win1", src:"img/Win-left.png"},
        {id:"win2", src:"img/Win-right.png"},
        {id:"lose1", src:"img/Lose-left.png"},
        {id:"lose2", src:"img/Lose-right.png"},

        /////////////////////////////////////////////////
    ],false); // false，先不動作，等load()
    init();

}
// chapter3 的範例更新方面
function init(){
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.setFPS(100);
    movingBoundary = stage.canvas.width / 2;

    stage.enableMouseOver();
    preloader = new ui.Preloader('00ff00','#000');
    preloader.x = (stage.canvas.width / 2) - (preloader.width / 2);
    preloader.y = (stage.canvas.height / 2) - (preloader.height / 2);
    stage.addChild(preloader);
    queue.addEventListener("complete", Menu); // load完跑initGame
    queue.addEventListener('progress', onFileProgress);
    queue.load(); // Call the load method to begin a paused queue
}

function onFileProgress(e) {
    preloader.update(e.progress);
}

function initGame() {
   /////////////////////////////////////////////////////////////////
    stage.removeChild(startButton,introduceButton,topicButton);
    startButton = null;
    introduceButton = null;
    topicButton = null;
  ////////////////////////////////////////////////////////////////////
    spritesheet1 = new createjs.SpriteSheet({
        "images": [queue.getResult("character1")],
        "frames": {"height": 96, "count": 10, "width": 75, "regX": 0, "regY": 0},
        "animations": {"idle":[9], "run":[0,9,'run',1.0]}
    });

    spritesheet2 = new createjs.SpriteSheet({
        "images": [queue.getResult("character2")],
        "frames": {"height": 96, "count": 10, "width": 75, "regX": 0, "regY": 0},
        "animations": {"idle":[9], "run":[0,9,'run',1.0]}
    });

    rate = 0; // 計算生成物件的次數，用來逐個顯現物件
    EndGame1=0, EndGame2=0;
    //////////////////////////////////////////////////////
    stop(soundName);
    soundName = "backgroundmusic";
    play(soundName);
    //////////////////////////////////////////////////////

    buildGround();
    buildbloodBar1();
	 buildbloodBar2();
    buildWall();
    buildwindDirection();
    buildCharacter();


    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}

// 生成背景
function buildGround() {
  	var grdimg = queue.getResult("ground");
    var ground = new createjs.Bitmap(grdimg);
    var con = new createjs.Container();
    var i;
    for (i = 0; i < 20; i++) {
    		if(i < 7) {
          	var tempBlockGround = ground.clone();
            tempBlockGround.x = i * 70;
            tempBlockGround.y = 600 - 50;

            con.addChild(tempBlockGround);
      	}
      	if(i > 10) {
      		  var tempBlockGround = ground.clone();
            tempBlockGround.x = 1350 - (i - 11)*70;
            tempBlockGround.y = 600 - 50;

            con.addChild(tempBlockGround);
    		}
    }
    con.alpha = 0;
    createjs.Tween.get(con).wait(500 + 150 * rate++).to({alpha:1}, 1000);

    stage.addChild(con);

}

// 生成角色1、角色2
function buildCharacter() {
    character1 = new sprites.Character1(spritesheet1);
    character1.x = 0;
    character1.y = characterInitialCoordinateY;
    character1.alpha = 0; // 透明度為0
    createjs.Tween.get(character1).wait(500 + 150 * rate).to({alpha:1}, 1000); // 浮現出來
    window.sprites.Character1.parameter.characterLoadInterval = setInterval(handleCharacter1Position, 15);


    character2 = new sprites.Character2(spritesheet2);
    character2.x = stage.canvas.width;
    character2.y = characterInitialCoordinateY;
    character2.alpha = 0;
    character2.scaleX *= -1;
    createjs.Tween.get(character2).wait(500 + 150 * rate++).to({alpha:1}, 1000); // 浮現出來
    window.sprites.Character2.parameter.characterLoadInterval = setInterval(handleCharacter2Position, 15);

    stage.addChild(character1, character2);
}

// 生成罐頭用量角器，面向右邊
function buildProtractor1()  {
    // 圓形+指針
    var img1 = queue.getResult("circle");
    circleImg1 = new createjs.Bitmap(img1);
    circleImg1.alpha = 0.5;
    var img2 = queue.getResult("arrow");
    arrowImg1 = new createjs.Bitmap(img2);
    arrowImg1.rotation = 0;
    arrowImg1.x = 0;
    arrowImg1.y = img1.height;
    // regX regY 用小畫家抓比較快
    arrowImg1.regX = 29;
    arrowImg1.regY = 195;
    arrowImg1.scaleX = arrowImg1.scaleY = 0.71;


    protractorContainer1 = new ui.Container.Protractor1();
    protractorContainer1.addChild(circleImg1);
    protractorContainer1.addChild(arrowImg1);
    protractorContainer1.mouseEnabled = true;
    stage.addChild(protractorContainer1);

    protractorContainer1.startPlayProtractor();
}

// 生成骨頭用量角器，面向左邊
function buildProtractor2() {
    var img1 = queue.getResult("circle2");
    circleImg2 = new createjs.Bitmap(img1);
    circleImg2.alpha = 0.5;
    var img2 = queue.getResult("arrow");
    arrowImg2 = new createjs.Bitmap(img2);
    arrowImg2.rotation = 0;
    arrowImg2.x = img1.width;
    arrowImg2.y = img1.height;
    // regX regY 用小畫家抓比較快
    arrowImg2.regX = 29;
    arrowImg2.regY = 195;
    arrowImg2.scaleX = arrowImg2.scaleY = 0.71;


    protractorContainer2 = new ui.Container.Protractor2();
    protractorContainer2.addChild(circleImg2);
    protractorContainer2.addChild(arrowImg2);


    stage.addChild(protractorContainer2);

    protractorContainer2.startPlayProtractor();
}

// 生成攻擊物件1
function buildAttack1() {
    // 罐頭
    var img1 = queue.getResult("can");
    attackImg1 = new createjs.Bitmap(img1);
    attackImg1.scaleX = attackImg1.scaleY = 0.2; // 物體原本大小的倍數
    attackImg1.regX = 124; // 旋轉座標，根據物體本身的座標來定
    attackImg1.regY = 324;

    attackContainer1 = new ui.Container.AttackObject1();
    attackContainer1.addChild(attackImg1);

    stage.addChild(attackContainer1);
}

// 生成攻擊物件2
function buildAttack2() {
    // 骨頭
    var img2 = queue.getResult("dogbone"); // 這裡要另外設一個img是要拿他的width, height
    attackImg2 = new createjs.Bitmap(img2);
    attackImg2.scaleX = attackImg2.scaleY = 0.2; // 物體原本大小的倍數
    attackImg2.regX = 216; // 旋轉座標，根據物體本身的座標來定
    attackImg2.regY = 91;

    attackContainer2 = new ui.Container.AttackObject2();
    attackContainer2.addChild(attackImg2);

    stage.addChild(attackContainer2);
}

// 生成力量條1
function buildStrengthBar1() {

    strengthBar1 = new ui.Container.StrengthBar1('rgb(201, 22, 16)','#000');

    // 力量條來回變換數值
    window.ui.Container.StrengthBar1.parameter.strengthBarLoadInterval = setInterval(function() {
        if(strengthBar1.bar.scaleX >= 0 && window.ui.Container.StrengthBar1.parameter.strengthBarDirect == true) { // 往右跑
            if(strengthBar1.bar.scaleX >= 1){
                window.ui.Container.StrengthBar1.parameter.strengthBarDirect = false;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(strengthBar1.bar).to({scaleX: Math.round((strengthBar1.bar.scaleX+0.1) * 10) / 10}, 10);
            // +-0.1的話要用Math.round()四捨五入, 因為+0.1不一定是+剛好，會有小誤差
        }
        else if(strengthBar1.bar.scaleX <= 1 && window.ui.Container.StrengthBar1.parameter.strengthBarDirect == false) { // 往左跑
            if(strengthBar1.bar.scaleX <= 0){
                window.ui.Container.StrengthBar1.parameter.strengthBarDirect = true;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(strengthBar1.bar).to({scaleX: Math.round((strengthBar1.bar.scaleX-0.1) * 10) / 10}, 10);
            // +-0.1的話要用Math.round()四捨五入, 因為+0.1不一定是+剛好，會有小誤差
        }
    }, 50);

    stage.addChild(strengthBar1);
}

// 生成力量條2
function buildStrengthBar2() {
    strengthBar2 = new ui.Container.StrengthBar2('rgb(201, 22, 16)','#000');

    // 力量條來回變換數值
    window.ui.Container.StrengthBar2.parameter.strengthBarLoadInterval = setInterval(function() {
        if(strengthBar2.bar.scaleX >= 0 && window.ui.Container.StrengthBar2.parameter.strengthBarDirect == true) { // 往右跑
            if(strengthBar2.bar.scaleX >= 1){
                window.ui.Container.StrengthBar2.parameter.strengthBarDirect = false;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(strengthBar2.bar).to({scaleX: Math.round((strengthBar2.bar.scaleX+0.1) * 10) / 10}, 10);
            // +-0.1的話要用Math.round()四捨五入, 因為+0.1不一定是+剛好，會有小誤差
        }
        else if(strengthBar2.bar.scaleX <= 1 && window.ui.Container.StrengthBar2.parameter.strengthBarDirect == false) { // 往左跑
            if(strengthBar2.bar.scaleX <= 0){
                window.ui.Container.StrengthBar2.parameter.strengthBarDirect = true;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(strengthBar2.bar).to({scaleX: Math.round((strengthBar2.bar.scaleX-0.1) * 10) / 10}, 10);
            // +-0.1的話要用Math.round()四捨五入, 因為+0.1不一定是+剛好，會有小誤差
        }
    }, 50);

    stage.addChild(strengthBar2);
}

//生成血量1
function buildbloodBar1() {
    bloodBar1 = new ui.Container.BloodBar1('rgb(201, 22, 16)','#000');

    //createjs.Tween.get(bloodBar1.bar).to({scaleX: 1}, 10);
    createjs.Tween.get(bloodBar1).wait(500 + 150 * rate).to({alpha:1}, 1000);


    stage.addChild(bloodBar1);
}

//生成血量2
function buildbloodBar2() {
    bloodBar2 = new ui.Container.BloodBar2('rgb(201, 22, 16)','#000');

    //createjs.Tween.get(bloodBar2.bar).to({scaleX: 1}, 10);
    createjs.Tween.get(bloodBar2).wait(500 + 150 * rate++).to({alpha:1}, 1000);

    stage.addChild(bloodBar2);
}

//生成風向
function buildwindDirection() {
  	windBar = new ui.Container.WindDirect('rgb(16, 22, 201)','#000');

    createjs.Tween.get(windBar).wait(500 + 150 * rate++).to({alpha:1}, 1000);

  	window.ui.Container.WindDirect.parameter.windBarLoadInterval = setInterval(function() {
    		var direct = Math.round( Math.random() * 20 );

    		if(direct >= 10){
    			//window.ui.Container.WindDirectRight.parameter.windBarDirect = true;
    			//createjs.Tween.get(windBar.bar).to({scaleX: (direct - 10) / 10}, 10).call(function(){console.log("windBar.bar.scaleX: " + windBar.bar.scaleX);});
          createjs.Tween.get(windBar.bar).to({scaleX: (direct - 10) / 10}, 10);
    		}else{
    			//window.ui.Container.WindDirectRight.parameter.windBarDirect = false;
    			//createjs.Tween.get(windBar.bar).to({scaleX: (direct / 10) - 1}, 10).call(function(){console.log("windBar.bar.scaleX: " + windBar.bar.scaleX);});
          createjs.Tween.get(windBar.bar).to({scaleX: (direct / 10) - 1}, 10);
    		}

    }, 5000);

    stage.addChild(windBar);
}

// 生成圍牆
function buildWall() {
    var img1 = queue.getResult("wall1");
    wallImg = new createjs.Bitmap(img1);
    var img2 = queue.getResult("wall2");
    wallImg2 = new createjs.Bitmap(img2);
    wallImg.x = movingBoundary - 156;
    wallImg.y = 0;
    wallImg.alpha = 0;
    wallImg.scaleX = 1;
    wallImg.scaleY = 1.16;
    createjs.Tween.get(wallImg).wait(500 + 150 * rate++).to({alpha:1.0}, 1000); // 浮現出來

    stage.addChild(wallImg);

}

// 設定攻擊物件1可以看見 + 把物件'是否已存在遊戲中'設定為true-(作用為讓玩家一次只能設出一個攻擊物件) + 設定攻擊物件1的處理速度
function startPlayAttackImg1() {
    attackContainer1.visible = true;
    window.ui.Container.AttackObject1.parameter.isExisting = true;
    window.ui.Container.AttackObject1.parameter.attackLoadInterval = setInterval(playAttackImg1, 50);

    //////////////////////////////////////////////////////
    soundName = "P1_attack";
    play(soundName);
    //////////////////////////////////////////////////////
}

// 設定攻擊物件2可以看見 + 把物件'是否已存在遊戲中'設定為true-(作用為讓玩家一次只能設出一個攻擊物件) + 設定攻擊物件2的處理速度
function startPlayAttackImg2() {
    attackContainer2.visible = true;
    window.ui.Container.AttackObject2.parameter.isExisting = true;
    window.ui.Container.AttackObject2.parameter.attackLoadInterval = setInterval(playAttackImg2, 50);

    //////////////////////////////////////////////////////
    soundName = "P2_attack";
    play(soundName);
    //////////////////////////////////////////////////////
}

// 更新攻擊物件1的位置 + 物體旋轉 + 判定是否出界 + 判定是否K到火車 + 判定是否攻擊到玩家2
function playAttackImg1() {
    createjs.Tween.get(attackContainer1)
        .to({rotation:360}, 3000);
		attackContainer1.x += window.ui.Container.AttackObject1.parameter.speedX;
    attackContainer1.y += window.ui.Container.AttackObject1.parameter.speedY;
    window.ui.Container.AttackObject1.parameter.speedY += gravity;

    // 超過界限，移除Object
    if(attackContainer1.y > stage.canvas.height || attackContainer1.x > stage.canvas.width + 30) {
        clearInterval(window.ui.Container.AttackObject1.parameter.attackLoadInterval); // 停止週期性的調用函數
        stage.removeChild(attackContainer1);
        attackContainer1 = null;
        window.ui.Container.AttackObject1.parameter.isExisting = false;
        window.ui.Container.AttackObject1.parameter.overCenter = false;
        return;
    }
    // 有無K到火車
    if(attackContainer1.x >= movingBoundary - 80 &&
              attackContainer1.y > (stage.canvas.height / 2 - 80) &&
                  window.ui.Container.AttackObject1.parameter.overCenter == false) {
        clearInterval(window.ui.Container.AttackObject1.parameter.attackLoadInterval); // 停止週期性的調用函數
        stage.removeChild(attackContainer1);
        attackContainer1 = null;
        window.ui.Container.AttackObject1.parameter.isExisting = false;
        window.ui.Container.AttackObject1.parameter.overCenter = false;
        soundName = "Ktrain";
        play(soundName);
        return;
    }
    // 是否越過中線，確定越過後就不會再跑"有無K到火車""的判斷式
    if(attackContainer1.x > movingBoundary) {
        window.ui.Container.AttackObject1.parameter.overCenter = true;
    }
    // 是否打到玩家2
    if(attackContainer1.x >= character2.x - 105 - 30  && attackContainer1.x <= character2.x - 45 + 40 &&
        attackContainer1.y >= character2.y + 10 - 30  && attackContainer1.y <= character2.y + 95 + 20 ) {
            clearInterval(window.ui.Container.AttackObject1.parameter.attackLoadInterval); // 停止週期性的調用函數
            stage.removeChild(attackContainer1);
            attackContainer1 = null;
            window.ui.Container.AttackObject1.parameter.isExisting = false;
			if(bloodBar2.bar.scaleX > 0.05){
        EndGame2 = EndGame2 + 2;
				createjs.Tween.get(bloodBar2.bar).to({scaleX: bloodBar2.bar.scaleX - 0.2}, 10);
        // Left Win Right Lose
        if(EndGame2 == 10){
          EndGame();
        }
			}
            window.ui.Container.AttackObject1.parameter.overCenter = false;
            soundName = "P2_Beattacked";
            play(soundName);
            return;
    }
}

// 更新攻擊物件2的位置 + 物體旋轉 + 判定是否出界 + 判定是否K到火車 + 判定是否攻擊到玩家1
function playAttackImg2() {
    createjs.Tween.get(attackContainer2)
        .to({rotation:360}, 3000);
		attackContainer2.x += window.ui.Container.AttackObject2.parameter.speedX;
    attackContainer2.y += window.ui.Container.AttackObject2.parameter.speedY;
    window.ui.Container.AttackObject2.parameter.speedY += gravity;

    // 超過界限，移除Object
    if(attackContainer2.y > stage.canvas.height || attackContainer2.x > stage.canvas.width + 30) {
        clearInterval(window.ui.Container.AttackObject2.parameter.attackLoadInterval); // 停止週期性的調用函數
        stage.removeChild(attackContainer2);
        attackContainer2 = null;
        window.ui.Container.AttackObject2.parameter.isExisting = false;
        window.ui.Container.AttackObject2.parameter.overCenter = false;
        return;
    }
    // 有無K到火車
    if(attackContainer2.x <= movingBoundary + 40 &&
              attackContainer2.y > (stage.canvas.height / 2 - 80) &&
                  window.ui.Container.AttackObject2.parameter.overCenter == false) {
        clearInterval(window.ui.Container.AttackObject2.parameter.attackLoadInterval); // 停止週期性的調用函數
        stage.removeChild(attackContainer2);
        attackContainer2 = null;
        window.ui.Container.AttackObject2.parameter.isExisting = false;
        window.ui.Container.AttackObject2.parameter.overCenter = false;
        soundName = "Ktrain";
        play(soundName);
        return;
    }
    // 是否越過中線，確定越過後就不會再跑"有無K到火車""的判斷式
    if(attackContainer2.x < movingBoundary) {
        window.ui.Container.AttackObject2.parameter.overCenter = true;
    }
    // 是否打到玩家1
    if(attackContainer2.x >= character1.x + 50 - 40  && attackContainer2.x <= character1.x + 110 + 30 &&
        attackContainer2.y >= character1.y + 10 - 30  && attackContainer2.y <= character1.y + 95 + 20 ) {
            clearInterval(window.ui.Container.AttackObject2.parameter.attackLoadInterval); // 停止週期性的調用函數
            stage.removeChild(attackContainer2);
            attackContainer2 = null;
            window.ui.Container.AttackObject2.parameter.isExisting = false;
			if(bloodBar1.bar.scaleX > 0.05){
        EndGame1 = EndGame1 + 2;
				createjs.Tween.get(bloodBar1.bar).to({scaleX: bloodBar1.bar.scaleX - 0.2}, 10);
        // Right Win Left Lose
        if(EndGame1 == 10){
          EndGame();
        }
			}
            window.ui.Container.AttackObject2.parameter.overCenter = false;
            soundName = "P1_Beattacked";
            play(soundName);
            return;
    }


}

// 指針1轉動
function playProtractor1() {
        if(arrowImg1.rotation >= -1 && arrowDirect1 == true) {
            if(arrowImg1.rotation >= 90){
                arrowDirect1 = false;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(arrowImg1).to({rotation: arrowImg1.rotation+1}, 10);
        }
        else if(arrowImg1.rotation <= 91 && arrowDirect1 == false) {
            if(arrowImg1.rotation <= 0){
                arrowDirect1 = true;
                return;
            }
            createjs.Tween.get(arrowImg1).to({rotation: arrowImg1.rotation-1}, 10);
        }
}

// 指針2轉動
function playProtractor2() {
        if(arrowImg2.rotation <= 1 && arrowDirect2 == true) {
            if(arrowImg2.rotation <= -90){
                arrowDirect2 = false;
                return;
            }
            // rotation是以圓形來算角度 上方0度 右方90度 下方 180度 左方 270度
            createjs.Tween.get(arrowImg2).to({rotation: arrowImg2.rotation-1}, 10);
        }
        else if(arrowImg2.rotation >= -91 && arrowDirect2 == false) {
            if(arrowImg2.rotation >= 0){
                arrowDirect2 = true;
                return;
            }
            createjs.Tween.get(arrowImg2).to({rotation: arrowImg2.rotation+1}, 10);
        }
}

// 處理鍵盤按下事件
function handleKeyDown(e) {
        switch (e.keyCode) {
            // 人物1--------------------------------------------------------------------------------------------------------------------------------
            case window.sprites.Character1.parameter.KEYCODE_LEFT: // AAAAAAAAAAAAAAAAAAAAAA
                    window.sprites.Character1.parameter.moveLeft = true;
                    window.sprites.Character1.parameter.keyUp = false;
                    character1.gotoAndPlay('run');
                    //////////////////////////////////////////////////////
                            soundName = "movemusic";
                            play(soundName);
                    //////////////////////////////////////////////////////
                    break;
            case window.sprites.Character1.parameter.KEYCODE_RIGHT: // DDDDDDDDDDDDDDDDDDDDDD
                    window.sprites.Character1.parameter.moveRight = true;
                    window.sprites.Character1.parameter.keyUp = false;
                    character1.gotoAndPlay('run');
                    //////////////////////////////////////////////////////
                            soundName = "movemusic";
                            play(soundName);
                    //////////////////////////////////////////////////////
                    break;
            case window.sprites.Character1.parameter.ATTACK: // RRRRRRRRRRRRRRRRRRRRRRRRRRR
                    if(window.ui.Container.AttackObject1.parameter.isExisting == true) { // 攻擊物件1存在，不可再繼續創，要等物件消失
                        return;
                    }
                    // 人物1第3次按攻擊按鈕，確定攻擊力道，攻擊物件1 FireFireFireFireFireFire
                    if(window.sprites.Character1.parameter.protractorChecked == true && window.sprites.Character1.parameter.attackKeydownCount == 2) {
                        window.sprites.Character1.parameter.attackKeydownCount = 0;
                        window.sprites.Character1.parameter.buildedProtractor = false;
                        window.sprites.Character1.parameter.protractorChecked = false;
                        clearInterval(window.ui.Container.StrengthBar1.parameter.strengthBarLoadInterval);
                        window.ui.Container.StrengthBar1.parameter.strengthBarLoadInterval = null;

                        strength1 = totalHandPower * strengthBar1.bar.scaleX;
                        window.ui.Container.AttackObject1.parameter.speedX = strength1 * window.ui.Container.Protractor1.parameter.cs + totalWindPower * windBar.bar.scaleX;
                        window.ui.Container.AttackObject1.parameter.speedY = strength1 * window.ui.Container.Protractor1.parameter.sn;
                        stage.removeChild(protractorContainer1);
                        stage.removeChild(strengthBar1);
                        protractorContainer1 = null;
                        strengthBar1 = null;
                        attackContainer1.tickEnabled = false;
                        startPlayAttackImg1();
                        return;
                    }
                    // 人物1第2次按攻擊按鈕，確定角度， 創建力量條1
                    if(window.sprites.Character1.parameter.attackKeydownCount == 1 && window.sprites.Character1.parameter.buildedProtractor == true) {
                        window.sprites.Character1.parameter.protractorChecked = true;
                        window.sprites.Character1.parameter.attackKeydownCount++;
                        clearInterval(window.ui.Container.Protractor1.parameter.protractorLoadInterval);
                        window.ui.Container.Protractor1.parameter.protractorLoadInterval = null;
                        protractorContainer1.mouseEnabled = false;

                        window.ui.Container.Protractor1.parameter.angle = -(90-arrowImg1.rotation) /180.*Math.PI;
                        window.ui.Container.Protractor1.parameter.sn = Math.sin(window.ui.Container.Protractor1.parameter.angle);
                        window.ui.Container.Protractor1.parameter.cs = Math.cos(window.ui.Container.Protractor1.parameter.angle);

                        buildStrengthBar1();
                        buildAttack1();
                        return;
                    }
                    // 人物1第1次按攻擊按鈕，創建量角器1，等待check
                    if(window.sprites.Character1.parameter.buildedProtractor == false) {
                        window.sprites.Character1.parameter.attackKeydownCount++;
                        window.sprites.Character1.parameter.buildedProtractor = true;
                        buildProtractor1();
                        return;
                    }
                    break;
            // 人物2--------------------------------------------------------------------------------------------------------------------------------
            case window.sprites.Character2.parameter.KEYCODE_LEFT: // 方向鍵左方向鍵左方向鍵左方向鍵左方向鍵左方向鍵左方向鍵左
                    window.sprites.Character2.parameter.moveLeft = true;
                    window.sprites.Character2.parameter.keyUp = false;
                    character2.gotoAndPlay('run');

                    //////////////////////////////////////////////////////
                            soundName = "movemusic";
                            play(soundName);
                    //////////////////////////////////////////////////////
                    break;
            case window.sprites.Character2.parameter.KEYCODE_RIGHT: // 方向鍵右方向鍵右方向鍵右方向鍵右方向鍵右方向鍵右方向鍵右
                    window.sprites.Character2.parameter.moveRight = true;
                    window.sprites.Character2.parameter.keyUp = false;
                    character2.gotoAndPlay('run');

                    //////////////////////////////////////////////////////
                            soundName = "movemusic";
                            play(soundName);
                   //////////////////////////////////////////////////////
                    break;
            case window.sprites.Character2.parameter.ATTACK: // LLLLLLLLLLLLLLLLLLLLLLLLLLL
                    if(window.ui.Container.AttackObject2.parameter.isExisting == true) {
                        return;
                    }
                    // 人物2第3次按攻擊按鈕，確定攻擊力道，攻擊物件2 FireFireFireFireFireFire
                    if(window.sprites.Character2.parameter.protractorChecked == true && window.sprites.Character2.parameter.attackKeydownCount == 2) {
                        window.sprites.Character2.parameter.attackKeydownCount = 0;
                        window.sprites.Character2.parameter.buildedProtractor = false;
                        window.sprites.Character2.parameter.protractorChecked = false;
                        clearInterval(window.ui.Container.StrengthBar2.parameter.strengthBarLoadInterval);
                        window.ui.Container.StrengthBar2.parameter.strengthBarLoadInterval = null;

                        strength2 = totalHandPower * strengthBar2.bar.scaleX;
                        window.ui.Container.AttackObject2.parameter.speedX = strength2 * window.ui.Container.Protractor2.parameter.cs + totalWindPower * windBar.bar.scaleX;
                        window.ui.Container.AttackObject2.parameter.speedY = strength2 * window.ui.Container.Protractor2.parameter.sn;
                        stage.removeChild(protractorContainer2);
                        stage.removeChild(strengthBar2);
                        protractorContainer2 = null;
                        strengthBar2 = null;
                        attackContainer2.tickEnabled = false;
                        startPlayAttackImg2();
                        return;
                    }
                    // 人物2第2次按攻擊按鈕，確定角度， 創建力量條2
                    if(window.sprites.Character2.parameter.attackKeydownCount == 1 && window.sprites.Character2.parameter.buildedProtractor == true) {
                        window.sprites.Character2.parameter.protractorChecked = true;
                        window.sprites.Character2.parameter.attackKeydownCount++;
                        clearInterval(window.ui.Container.Protractor2.parameter.protractorLoadInterval);
                        window.ui.Container.Protractor2.parameter.protractorLoadInterval = null;
                        protractorContainer2.mouseEnabled = false;

                        window.ui.Container.Protractor2.parameter.angle = -(90-arrowImg2.rotation) /180.*Math.PI;
                        window.ui.Container.Protractor2.parameter.sn = Math.sin(window.ui.Container.Protractor2.parameter.angle);
                        window.ui.Container.Protractor2.parameter.cs = Math.cos(window.ui.Container.Protractor2.parameter.angle);

                        buildStrengthBar2();
                        buildAttack2();
                        return;
                    }
                    // 人物2第1次按攻擊按鈕，創建量角器2，等待check
                    if(window.sprites.Character2.parameter.buildedProtractor == false) {
                        window.sprites.Character2.parameter.attackKeydownCount++;
                        window.sprites.Character2.parameter.buildedProtractor = true;
                        buildProtractor2();
                        return;
                    }
                    break;
            default:
                break;
        }
}

// 處理鍵盤放開事件
function handleKeyUp(e) {
        switch (e.keyCode) {
          // 人物1--------------------------------------------------------------------------------------------------------------------------------
            case window.sprites.Character1.parameter.KEYCODE_LEFT: // AAAAAAAAAAAAAAAAAAAAAA
                    window.sprites.Character1.parameter.moveLeft = false;
                    window.sprites.Character1.parameter.keyUp = true;
                    break;
            case window.sprites.Character1.parameter.KEYCODE_RIGHT: // DDDDDDDDDDDDDDDDDDDDDD
                    window.sprites.Character1.parameter.moveRight = false;
                    window.sprites.Character1.parameter.keyUp = true;
                    break;
            case window.sprites.Character1.parameter.ATTCK:
                    break;
          // 人物2--------------------------------------------------------------------------------------------------------------------------------
            case window.sprites.Character2.parameter.KEYCODE_LEFT: // 方向鍵左方向鍵左方向鍵左方向鍵左方向鍵左方向鍵左
                    window.sprites.Character2.parameter.moveLeft = false;
                    window.sprites.Character2.parameter.keyUp = true;
                    break;
            case window.sprites.Character2.parameter.KEYCODE_RIGHT: // 方向鍵右方向鍵右方向鍵右方向鍵右方向鍵右方向鍵右
                    window.sprites.Character2.parameter.moveRight = false;
                    window.sprites.Character2.parameter.keyUp = true;
                    break;
            case window.sprites.Character2.parameter.ATTCK:
                    break;
            default:
                break;
        }
}

// 更新人物1的位置
function handleCharacter1Position() {
    if (window.sprites.Character1.parameter.moveLeft)
        character1.x -= xVel;
    else if (window.sprites.Character1.parameter.moveRight)
        character1.x += xVel;
    stage.update();
}

// 更新人物2的位置
function handleCharacter2Position() {
    if (window.sprites.Character2.parameter.moveLeft)
        character2.x -= xVel;
    else if (window.sprites.Character2.parameter.moveRight)
        character2.x += xVel;

    stage.update();
}
