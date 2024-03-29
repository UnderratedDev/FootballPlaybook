<?php
    echo "
        <html>
            <head>
                <link rel='stylesheet' type='text/css' href='css/Cleanup.css' />
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
                <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
                <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
                <script src='http://knockoutjs.com/downloads/knockout-3.4.2.js'></script>
                <script src = './script/fabric.js'></script>
                <script src = './script/jscolor.min.js'></script>
                <script type='text/javascript' src='script/Canvas.js'></script>
            </head>
            <div class='container-fluid text-center'>
                <!-- div contains buttons -->
                <div class='col-xs-12 lgreen'>
                    <div class='col-xs-4'>
                        <button class='btn' data-toggle='collapse' data-target='#pinfo'>
                            Play info
                        </button>
                        <button class='btn' data-toggle='collapse' data-target='#canvasPNGImg' id = 'canvasPng'>
                            Save
                        </button>
                        <button class='btn' id = 'clearCanvasBtn'>
                            Clear
                        </button>
                    </div>
                    <!-- div contains colours -->
                    <div class='col-xs-3'>
                        <button class='btn' id = 'yellowBtn'>
                            <span class='glyphicon glyphicon-tint yellow'></span>
                        </button>
                        <button class='btn' id = 'whiteBtn'>
                            <span class='glyphicon glyphicon-tint white'></span>
                        </button>
                        <button class='btn' id = 'grayBtn'>
                            <span class='glyphicon glyphicon-tint gray'></span>
                        </button>
                        <button class='btn' id = 'blueBtn'>
                            <span class='glyphicon glyphicon-tint blue'></span>
                        </button>
                        <button class='btn' id = 'redBtn'>
                            <span class='glyphicon glyphicon-tint' style='color:red'></span>
                        </button>
                        <button class='glyphicon glyphicon-tint jscolor {valueElement:null, styleElement:'ColourPalleteBtn', onFineChange:'update(this)'}'
                                id = 'ColourPalleteBtn' value='#ffffff'>
                        </button>
                    </div>
                    <!-- div contains shapes -->
                    <div class='col-xs-5'>
                        <button class='btn' id = 'selectBtn'>
                            <img id='cursor' src='img/cursor.png' class='shapebtn' />
                        </button>
                        <button class='btn' id = 'lineBtn'>
                            <img id='line' src='img/line_black.png' class='shapebtn' />
                        </button>
                        <button class='btn' id = 'cLineBtn'>
                            <img id='line' src='img/cline_black.png' class='shapebtn' />
                        </button>
                        <button class='btn' id='circleBtn'>
                            <img id='o' src='img/o_black.png' class='shapebtn' />
                        </button>
                        <button class='btn' id='crossBtn'>
                            <img id='x' src='img/x_black.png' class='shapebtn' />
                        </button>
                        <button class='btn' id='rectBtn'>
                            <img id='sq' src='img/square.png' class='shapebtn' />
                        </button>
                        <button class='btn' id='triangleBtn'>
                            <img id='tr' src='img/triangle.png' class='shapebtn' />
                        </button>
                        <button class = 'btn' id = 'eggBtn'>
                            <img id = 'eg' src = 'img/team/egg.png' class = 'shapeBtn' />
                        </button>
                        <input type='button' value = 'undo' id = 'undo'/>
                        <input type='button' value = 'redo' id = 'redo'/>
                        <input type = 'checkbox' value = 'SnapGrid' id = 'SnapGridCheck'/>Snap To Grid<br>
                    </div>
                </div>
                <!-- div contains play info -->
                <div class='col-xs-12 collapse' id='pinfo'>
                    play info text here.
                </div>
                <!-- div contains canvas -->
                <div class='col-xs-12' id = 'canvasWrapper'>
                    <!-- canvas size -->
                    <canvas id='canvas' width='943' height='504'></canvas>
                </div>
                <!-- div contains saved image -->
                <div class='col-xs-12 collapse' id='canvasPNGImg'>
                    Generated PNG:
                    <div class='col-xs-12'>
                        <img id='canvasImgSaved'>
                    </div>
                    <br/> *Click save again to collapse
                </div>
            </div>

    </html>";
?>