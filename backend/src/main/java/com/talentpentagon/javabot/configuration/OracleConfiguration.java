// package com.talentpentagon.javabot.configuration;

// import oracle.jdbc.pool.OracleDataSource;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.env.Environment;

// import javax.sql.DataSource;
// import java.sql.SQLException;

// @Configuration
// public class OracleConfiguration {
// Logger logger = LoggerFactory.getLogger(DbSettings.class);
// // @Autowired
// // private DbSettings dbSettings;
// @Autowired
// private Environment env;
// @Bean
// public DataSource dataSource() throws SQLException{

//     OracleDataSource ds = new OracleDataSource();
//     ds.setDriverType(env.getProperty("driver_class_name"));
//     logger.info("Using Driver " + env.getProperty("driver_class_name"));
//     ds.setURL(env.getProperty("db_url"));
//     logger.info("Using URL: " + env.getProperty("db_url"));
//     ds.setUser(env.getProperty("db_user"));
//     logger.info("Using Username " + env.getProperty("db_user"));
//     ds.setPassword(env.getProperty("dbpassword"));

//     // For local testing
//     // ds.setDriverType(dbSettings.getDriver_class_name());
//     // logger.info("Using Driver " + dbSettings.getDriver_class_name());
//     // ds.setURL(dbSettings.getUrl());
//     // logger.info("Using URL: " + dbSettings.getUrl());
//     // ds.setUser(dbSettings.getUsername());
//     // logger.info("Using Username: " + dbSettings.getUsername());
//     // ds.setPassword(dbSettings.getPassword());
//     return ds;
//     }

// }
