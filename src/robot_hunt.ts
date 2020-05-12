import moment from "moment";

export class RobotHunt {
  public send?: (str: string) => void;
  public options: Partial<OptionsT> = {};
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
  public start() {
    this.debug(`狩猎大战机器人开始工作`);
  }

  /**
   * 结束
   */
  public stop() {
    this.debug(`狩猎大战机器人停止工作`);
  }

  public debug(logs: string) {
    const m = moment();
    const now = m.format("YYYY-MM-DD HH:mm:ss");
    const text = `${now} >> ${logs}`;
    console.log(text);
    if (this.send) {
      this.send(text);
    }
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
