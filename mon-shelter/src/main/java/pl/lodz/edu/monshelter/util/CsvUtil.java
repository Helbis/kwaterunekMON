package pl.lodz.edu.monshelter.util;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.edu.monshelter.entities.Person;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class CsvUtil {

    private static final String IMIE = "IMIĘ";
    private static final String NAZWISKO = "NAZWISKO";
    private static final String STOPIEN = "STOPIEŃ";
    private static final String INSTYTUCJA = "INSTYTUCJA / JEDNOSTKA";
    private static final String DOD_INFO = "DODATKOWE INFORMACJE";

    public static List<Person> parseCsvFile(MultipartFile file) {
        int skipLines = 0;
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = fileReader.readLine()) != null) {
                if (line.startsWith("Lp")) {
                    break;
                }
                skipLines++;
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        List<Person> parsedPersonList = new ArrayList<>();
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            for (int i = 0; i < skipLines; i++) {
                fileReader.readLine();
            }
            CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(';').withAllowMissingColumnNames().withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                if(csvRecord.get(IMIE).isEmpty() ||csvRecord.get(NAZWISKO).isEmpty()){
                    continue;
                }
                Person person = new Person(csvRecord.get(IMIE),csvRecord.get(NAZWISKO),csvRecord.get(STOPIEN),csvRecord.get(INSTYTUCJA), csvRecord.get(DOD_INFO), null,true);
                parsedPersonList.add(person);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return parsedPersonList;
    }
}
