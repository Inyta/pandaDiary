package pers.yzh.pd.pd_front.entity.enums;

/**
 * @Author: zhangwei
 * @Date: 2020/8/11 9:05
 */
public enum ResultCode {

    SUCCESS(0), FAILED(-1);

    private final Integer code;

    ResultCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

}
