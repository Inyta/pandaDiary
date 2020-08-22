package pers.yzh.pd.pd_front.entity.po;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @Author: zhangwei
 * @Date: 2020/8/21 17:19
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("pd_diary")
public class Diary {

    private String id;

    private String content;

    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
}
