package pers.yzh.pd.pd_front.entity.po;

import com.baomidou.mybatisplus.annotation.TableName;
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

    private Date createTime;

    private String status;
}
