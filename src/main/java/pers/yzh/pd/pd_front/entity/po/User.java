package pers.yzh.pd.pd_front.entity.po;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 〈功能简述〉<br>
 * 〈〉
 *
 * @author qq371
 * @create 2020/11/11
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("pd_user")
public class User {
    private String userId;

    private String userName;

    private String password;

}
