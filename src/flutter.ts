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
            let _canvas = document.getElementById(canvas) as HTMLCanvasElement;
            if (!_canvas) {
                _canvas = document.createElement('canvas');
                _canvas.id = canvas;
                document.appendChild<HTMLCanvasElement>(_canvas);
            }
        }
        return new Flutter(_canvas, options);
    }

    private constructor(canvas: HTMLCanvasElement, options: model.IFlutterOptions) {
        console.log(canvas);
    }
}