package pl.lodz.edu.monshelter;

import java.util.ArrayList;
import java.util.List;

public class CollectionUtils {

    public static <T> List<T> iterableToList(Iterable<T> iterable) {
        List<T> result = new ArrayList<T>();
        iterable.forEach(result::add);
        return result;
    }
}
