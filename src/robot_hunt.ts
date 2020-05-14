import moment from "moment";

export class RobotHunt {
  public send?: (channel: string, ...args: any[]) => void;
  public options: Partial<OptionsT> = {};
  public timer: NodeJS.Timeout | null = null;
  public runState = false;
  /**
   * 修改配置
   */
  public changeOptions(options: Partial<OptionsT>) {
    this.options = options;
    this.debug(`配置已修改为：${JSON.stringify(options)}`);
  }

  /**
   * 开始
   */
  public start(options?: Partial<OptionsT>) {
    if (options) {
      this.changeOptions(options);
    }
    this.debug(`狩猎大战机器人开始工作`);
    this.runState = true;
    if (this.send) {
      this.send("hunt-start");
    }
    this.timer = setInterval(() => {
      if (!this.timer) {
        return;
      }
      this.debug(Date.now().toString());
    }, 2000);
  }

  /**
   * 结束
   */
  public stop() {
    this.debug(`狩猎大战机器人停止工作`);
    this.runState = false;
    if (this.send) {
      this.send("hunt-stop");
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public debug(logs: string) {
    const m = moment();
    const now = m.format("YYYY-MM-DD HH:mm:ss");
    const text = `${now} >> ${logs}`;
    console.log(text);
    if (this.send) {
      this.send("hunt-logs", text);
    }
  }

  public fetchLocation() {
    return { x: 1, y: 1 };
  }
}

type LocationT = { x: number; y: number };
export type OptionsT = {
  /**
   * 龙之谷安装目录
   */
  DN_INSTALL_DIR: string;
  /**
   * 竞技场图标坐标
   */
  JJC_ICON_LOCATION: LocationT;
  /**
   * 狩猎大战匹配坐标
   */
  HUNT_MATCH_LOCATION: LocationT;
  /**
   * 狩猎大战开始坐标
   */
  HUNT_START_LOCATION: LocationT;
  /**
   * 狩猎大战投降坐标
   */
  HUNT_SURRENDDER_LOCATION: LocationT;
  /**
   * 狩猎大战结束坐标
   */
  HUNT_STOP_LOCATION: LocationT;
};

export type ItemT = keyof OptionsT;
