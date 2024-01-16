package com.reine.producer.config;

import com.reine.producer.converter.reader.AuthorReader;
import com.reine.producer.converter.reader.BookReader;
import com.reine.producer.converter.writer.AuthorWriter;
import com.reine.producer.converter.writer.BookWriter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.data.r2dbc.dialect.MySqlDialect;

/**
 * @author reine
 */
@Configuration
public class R2dbcConfiguration {

    /**
     * 如果使用的是3.2.0或以上版本的SpringBoot，则此配置无效
     */
    @Bean
    @ConditionalOnMissingBean
    public R2dbcCustomConversions conversions() {
        return R2dbcCustomConversions.of(MySqlDialect.INSTANCE,
                new AuthorReader(),
                new BookReader(),
                new AuthorWriter(),
                new BookWriter());
    }

}
