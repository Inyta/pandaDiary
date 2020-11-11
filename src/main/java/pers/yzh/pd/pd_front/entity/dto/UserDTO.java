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
 * @create 2020/11/11
 */
@Getter
@Setter
public class UserDTO {
    private String userId;

    private String userName;

    private String password;
}
