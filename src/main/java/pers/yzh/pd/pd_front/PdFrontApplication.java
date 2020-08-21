package pers.yzh.pd.pd_front;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author 杨子晗
 * @create 2020/8/11
 */
@SpringBootApplication
@MapperScan("pers.yzh.pd.pd_front.mapper")
public class PdFrontApplication {

    public static void main(String[] args) {
        SpringApplication.run(PdFrontApplication.class, args);
    }

}
