package pers.yzh.pd.pd_front.entity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pers.yzh.pd.pd_front.entity.enums.ResultCode;

/**
 * @Author: zhangwei
 * @Date: 2020/8/11 9:04
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {

    private Integer code;

    private String msg;

    private T result;

    public static <T> Result<T> success() {
        return successWith(ResultCode.SUCCESS.getCode(), null, null);
    }

    public static <T> Result<T> success(String msg) {
        return successWith(ResultCode.SUCCESS.getCode(), msg, null);
    }

    public static <T> Result<T> success(T data) {
        return successWith(ResultCode.SUCCESS.getCode(), null, data);
    }

    public static <T> Result<T> success(String msg, T data) {
        return successWith(ResultCode.SUCCESS.getCode(), msg, data);
    }

    public static <T> Result<T> successWith(Integer code, String msg, T data) {
        return new Result<>(code, msg, data);
    }

    public static <T> Result<T> failed(String msg) {
        return failedWith(ResultCode.FAILED.getCode(), msg, null);
    }

    public static <T> Result<T> failedWith(Integer code, String msg, T data) {
        return new Result<>(code, msg, data);
    }

}

