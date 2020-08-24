package pers.yzh.pd.pd_front.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 〈功能简述〉<br>
 * 〈〉
 *
 * @author qq371
 * @create 2020/8/23
 */
@Getter
@Setter
public class DiaryDTO {
    private String id;

    private String content;

    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
}
