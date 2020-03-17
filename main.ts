enum eureka_IO {
    P0,
    P1,
    P2
}
enum eureka_denki {
    P0,
    P1
}
enum eureka_tlp {
    P0,
    P1
}
enum eureka_p1416 {
    P0,
    P1
}
enum onoff {
    ON,
    OFF
}
enum color {
    RED,
    YELLOW,
    BLUE
}
enum etc {
    AKARUSA,
    JINKAN
}
//% color="#74ad1d" block="ユーレカIO"
namespace eureka_blocks {


    //% color="#4741f1" weight=54 blockId=eureka_tl_blue block="青信号機　 %pin 点灯%mode" group="1_信号機"
    export function eureka_tl_blue(tlp: eureka_tlp, mode: onoff) {
        switch (tlp) {
            case eureka_tlp.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P14, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P14, 0);
                }
            case eureka_tlp.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P16, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P16, 0);
                }
        }
    }
    //% color="#ffa800" weight=53 blockId=eureka_tl_yellow block="黄信号機　 %pin 点灯%mode" group="1_信号機"
    export function eureka_tl_yellow(tlp: eureka_tlp, mode: onoff) {
        switch (tlp) {
            case eureka_tlp.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P13, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P13, 0);
                }
            case eureka_tlp.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P15, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P15, 0);
                }
        }
    }
    //% color="#ff4940" weight=52 blockId=eureka_tl_red block="赤信号機　 %pin 点灯%mode" group="1_信号機"
    export function eureka_tl_red(tlp: eureka_tlp, mode: onoff) {
        switch (tlp) {
            case eureka_tlp.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P0, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P0, 0);
                }
            case eureka_tlp.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P1, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P1, 0);
                }
        }
    }

    //% color="#1E90FF" weight=51 block="待ち時間（秒）%second" group="1_信号機"
    export function driveForwards(second: number): void {
        basic.pause(second * 1000);
    }
    //% color="#006B8F"  weight=27 block="%limit より暗かった　%tlp" group="2_電気の利用ユニット"
    export function decideLight(limit: number, tlp: eureka_tlp): boolean {
        switch (tlp) {
            case eureka_tlp.P0:
                if (pins.analogReadPin(AnalogPin.P0) < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
            case eureka_tlp.P1:
                if (pins.analogReadPin(AnalogPin.P1) < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    //% color="#006B8F"  weight=26 blockId=eureka_denkitemp block="電気の利用_光センサーの値　 %pin" group="2_電気の利用ユニット"
    export function eureka_denkitemp(pin: eureka_denki): number {
        switch (pin) {
            case eureka_denki.P0:
                return pins.analogReadPin(AnalogPin.P0);
            case eureka_denki.P1:
                return pins.analogReadPin(AnalogPin.P1);
        }
    }
    //% color="#009A00" weight=25 block="人が動いたら %pin" group="2_電気の利用ユニット"
    export function humanDetection(pin: eureka_p1416): boolean {
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
        switch (pin) {
            case eureka_p1416.P0:
                if (pins.digitalReadPin(DigitalPin.P14) == 1) {
                    return true;
                } else {
                    return false;
                }
                break;
            case eureka_p1416.P1:
                if (pins.digitalReadPin(DigitalPin.P16) == 1) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#009A00"  weight=24 blockId=eureka_denkihuman block="電気の利用_人感センサの値　 %pin" group="2_電気の利用ユニット"
    export function eureka_denkihuman(pin: eureka_denki): number {
        switch (pin) {
            case eureka_denki.P0:
                pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
                return pins.digitalReadPin(DigitalPin.P14);
            case eureka_denki.P1:
                pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
                return pins.digitalReadPin(DigitalPin.P16);
        }
    }

    //% color="#CFB600"  weight=23 blockId=eureka_denkiwhite block="電気の利用_白LED　 %pin %mode" group="2_電気の利用ユニット"
    export function eureka_denkiwhite(port: eureka_denki, mode: onoff) {
        switch (port) {
            case eureka_denki.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P13, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P13, 0);
                }
            case eureka_denki.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P15, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P15, 0);
                }
        }
    }

    //% color="#ff3d03" weight=19 blockId=eureka_buz_set block="ユーレカIOで音をならす" group="3_ユーレカIO"
    export function eureka_buz_set() {
        pins.analogSetPitchPin(AnalogPin.P8)
    }

    //% color="#525252" weight=18 blockId=eureka_relay block="リレー　 %pin %mode" group="3_ユーレカIO"
    export function eureka_relay(pin: eureka_IO, mode: onoff) {
        switch (pin) {
            case eureka_IO.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P0, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P0, 0);
                }
            case eureka_IO.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P1, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P1, 0);
                }
            case eureka_IO.P2:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P2, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P2, 0);
                }
        }
    }
    //% color="#00a6ff" weight=17 blockId=eureka_white block="白LED　 %pin %mode" group="3_ユーレカIO"
    export function eureka_white(port: eureka_IO, mode: onoff) {
        switch (port) {
            case eureka_IO.P0:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P0, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P0, 0);
                }
            case eureka_IO.P1:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P1, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P1, 0);
                }
            case eureka_IO.P2:
                if (mode == onoff.ON) {
                    return pins.digitalWritePin(DigitalPin.P2, 1);
                } else {
                    return pins.digitalWritePin(DigitalPin.P2, 0);
                }
        }
    }
    //% color="#c3c900"  weight=9 blockId=eureka_light block="光センサの値　 %pin" group="4_センサの値"
    export function eureka_light(pin: eureka_IO): number {
        switch (pin) {
            case eureka_IO.P0:
                return pins.analogReadPin(AnalogPin.P0);
            case eureka_IO.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case eureka_IO.P2:
                return pins.analogReadPin(AnalogPin.P2);
        }
    }

    //% color="#858585" weight=8 blockId=eureka_human block="人感センサの値　 %pin" group="4_センサの値"
    export function eureka_human(pin: eureka_IO): number {
        switch (pin) {
            case eureka_IO.P0:
                pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
                return pins.digitalReadPin(DigitalPin.P0);
            case eureka_IO.P1:
                pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
                return pins.digitalReadPin(DigitalPin.P1);
            case eureka_IO.P2:
                pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
                return pins.digitalReadPin(DigitalPin.P2);
        }
    }
    //% color="#ff7b00" weight=7 blockId=eureka_temp block="温度センサの値　 %pin" group="4_センサの値"
    export function eureka_temp(pin: eureka_IO): number {
        switch (pin) {
            case eureka_IO.P0:
                return Math.round((pins.analogReadPin(AnalogPin.P0) * 3250 / 1024 - 500) / 10);
            case eureka_IO.P1:
                return Math.round((pins.analogReadPin(AnalogPin.P1) * 3250 / 1024 - 500) / 10);
            case eureka_IO.P2:
                return Math.round((pins.analogReadPin(AnalogPin.P2) * 3250 / 1024 - 500) / 10);
        }
    }

    //% weight=6 blockId=sonar_ping block="超音波できょりをはかる" group="4_センサの値"
    export function ping() {
        // send
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P16, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P16, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P16, 0);

        // read
        const d = pins.pulseIn(DigitalPin.P8, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }

    //% color="#f071bd" weight=5 blockId=eureka_CdS block="フォトリフレクタの値　 %pin" group="4_センサの値""
    export function eureka_CdS(pin: eureka_IO): number {
        switch (pin) {
            case eureka_IO.P0:
                return pins.analogReadPin(AnalogPin.P0);
            case eureka_IO.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case eureka_IO.P2:
                return pins.analogReadPin(AnalogPin.P2);
        }
    }



}
//% color="#f5a142" block="ユーレカ車" icon="\uf1b9"
namespace eureka_blocks_car {
    /*--------------------------------------*/
    /*some parameters used for controlling the turn and length of the ServoLite board controlled :MOVE mini */
    const microSecInASecond = 1000000
    let distancePerSec = 100
    let numberOfDegreesPerSec = 200

    /**
     * Drives forwards. Call stop to stop
     */
    //% blockId=kitronik_servolite_servos_forward
    //% block="まえにすすむ" group="基本のうごき"
    export function forward(): void {
        pins.servoWritePin(AnalogPin.P13, 0);
        pins.servoWritePin(AnalogPin.P14, 180);
    }

    /**
     * Drives backwards. Call stop to stop
     */
    //% blockId=kitronik_servolite_servos_backward
    //% block="うしろにすすむ" group="基本のうごき"
    export function backward(): void {
        pins.servoWritePin(AnalogPin.P13, 180);
        pins.servoWritePin(AnalogPin.P14, 0);
    }

    /**
    * Turns left. Call stop to stop
    */
    //% blockId=kitronik_servolite_servos_left
    //% block="ひだりにまがる" group="基本のうごき"
    export function left(): void {
        pins.servoWritePin(AnalogPin.P13, 0);
        pins.servoWritePin(AnalogPin.P14, 0);
    }

    /**
     * Turns right. Call ``stop`` to stop
     */
    //% blockId=kitronik_servolite_servos_right
    //% block="みぎにまがる" group="基本のうごき"
    export function right(): void {
        pins.servoWritePin(AnalogPin.P13, 180);
        pins.servoWritePin(AnalogPin.P14, 180);
    }

    /**
     * Stop for 360 servos.
     * rather than write 90, which may not stop the servo moving if it is out of trim
     * this stops sending servo pulses, which has the same effect.
     * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
     * It will also not provide any holding force.
     */
    //% blockId=kitronik_servolite_servos_stop
    //% block="とまる" group="基本のうごき"
    export function stop(): void {
        pins.analogWritePin(AnalogPin.P13, 0);
        pins.analogWritePin(AnalogPin.P14, 0);
    }

    /**
     * Sends servos to 'neutral' position.
     * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     */
    //% blockId=kitronik_servolite_servos_neutral
    //% block="サーボをニュートラルにします" group="設定"
    export function neutral(): void {
        pins.servoWritePin(AnalogPin.P13, 90);
        pins.servoWritePin(AnalogPin.P14, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_forwards
    //% block=" %howFar|距離指定 まえにすすむ" group="詳しく動かす"
    export function driveForwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        forward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_backwards
    //% block=" %howFar|距離指定 うしろにすすむ" group="詳しく動かす"
    export function driveBackwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        backward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg how far to turn, eg: 90
     */
    //% blockId=kitronik_servolite_turn_right
    //% block=" %deg|度 みぎにまがる" group="詳しく動かす"
    export function turnRight(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P13, 130);
        pins.servoWritePin(AnalogPin.P14, 130);
        control.waitMicros(timeToWait);
        stop();
    }

    /**
    * Turns left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple turn, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg how far to turn, eg: 90
    */
    //% blockId=kitronik_servolite_turn_left
    //% block=" %deg|度 ひだりにまがる" group="詳しく動かす"
    export function turnLeft(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P13, 50);
        pins.servoWritePin(AnalogPin.P14, 50);
        control.waitMicros(timeToWait);
        stop()
    }

    /**
     * Allows the setting of the :MOVE mini turn speed.
     * This allows tuning for the turn x degrees commands
     * @param degPerSec : How many degrees per second the mini does.
     */
    //% blockId=kitronik_servolite_set_turn_speed_param
    //% block="まがるはやさを %DegPerSec|度毎秒 にする" group="設定"
    export function setDegreesPerSecond(degPerSec: number): void {
        numberOfDegreesPerSec = degPerSec
    }

    /**
     * Allows the setting of the :MOVE mini forward / reverse speed.
     * This allows tuning for the move x distance commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
    //% blockId=kitronik_servolite_set_movement_speed_param 
    //% block="まえにすすむはやさを %DistPerSec|mm毎秒 にする" group="設定"
    export function setDistancePerSecond(distPerSec: number): void {
        distancePerSec = distPerSec
    }
    /*--------------------------------------*/

}