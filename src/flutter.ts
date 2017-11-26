import * as flutterImage from 'demo/flutter.png';
import * as model from 'model';

export default class Flutter {
    private static NAME = 'flutte';
    /**
     * default options.
     */
    private static defaultOptions = {} as model.IFlutterOptions;
    /**
     * create instance.
     * @param canvasId canvas element's ID.
     * @param options flutter's options.
     */
    public static init(canvas: HTMLCanvasElement | string = Flutter.NAME, options: model.IFlutterOptions = Flutter.defaultOptions) {
        let _canvas = null;
        if (canvas instanceof HTMLCanvasElement) {
            _canvas = canvas;
        } else {
            // tslint:disable-next-line:no-shadowed-variable
            let _canvas = document.getElementById(canvas);
            if (_canvas === null) {
                _canvas = document.createElement('canvas');
                _canvas.id = canvas;
                document.body.appendChild(_canvas);
            }
        }

        return new Flutter(_canvas, options);
    }

    private ctx: CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    private x: number = 0;
    private image: HTMLImageElement;

    private constructor(canvas: HTMLCanvasElement, options: model.IFlutterOptions) {
        const renderMS = 10;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.image = new Image();
        this.image.src = flutterImage;

        setInterval(this.render.bind(this), renderMS);
    }

    private render() {
        // Canvas全体をクリア
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 要素を描画する
        // this.ctx.beginPath();
        // this.ctx.strokeRect(this.x, 0, 40, 40);

        this.ctx.drawImage(this.image, this.x, 0);

        if (this.x > this.width) {
            this.x = 0;
        } else {
            this.x += 1;
        }
    }
}
