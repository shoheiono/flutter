import Flutter from 'flutter';

namespace Demo {
    let flutter: Flutter = null;
    export function initialize(): void {
        const canvas = document.getElementById('demoCanvas') as HTMLCanvasElement;
        flutter = Flutter.init(canvas);
    }
}

Demo.initialize();
