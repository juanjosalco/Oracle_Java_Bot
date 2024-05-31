package com.talentpentagon.javabot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import com.talentpentagon.javabot.bot.OraBot;

@SpringBootApplication
public class JavabotApplication implements CommandLineRunner{

	private String telegramBotToken = "7148391306:AAG0LN85Z9pKee3DgoevkzzfJEYs-2-cb9A";

	private String botName = "TC3005OraBot";

	public static void main(String[] args) {
		SpringApplication.run(JavabotApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// try {
		// 	TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
		// 	telegramBotsApi.registerBot(new OraBot(telegramBotToken, botName));
		// } catch (TelegramApiException e) {
		// 	e.printStackTrace();
		// }
	}

}
