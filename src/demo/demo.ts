import Flutter from 'flutter';

namespace Demo {
    let flutter: Flutter = null;
    export function initialize(): void {
        flutter = Flutter.init();
    }
}

Demo.initialize();
