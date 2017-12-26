import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.FunctionBlock;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;
import net.sourceforge.jFuzzyLogic.rule.Variable;

import java.io.File;

class CameraData {
    public CameraAssesment assesment;
    public String name;
    public String image;
    public String brand;
    public Integer price;
    public Integer pixelDepth;
    public Integer pixels;
    public Integer maxISO;
    public Integer weight;
    public Integer autoFocus;
    public Long launchDate;
    public Float frameRate;
    public Integer[] resolution;
    public Integer[] ISO;
    public boolean touchScreen;
    public boolean video;
    public boolean flash;
    public boolean waterproof;
    public boolean bluetooth;
    public boolean gps;
    public boolean isMetal;
}

class CameraAssesment {

}

public class Main {
    public static void main(String[] args) {
        // Read files
        File rootFolder = new File("input");
        for (final File fileEntry : rootFolder.listFiles()) {
            if (fileEntry.isFile()) {
                System.out.println(fileEntry.getName());
            }
        }
    }

    static CameraAssesment assess() {
        CameraAssesment cameraAssesment = new CameraAssesment();

        // Load from 'FCL' file
        String fileName = "fcl/tipper.fcl";
        FIS fis = FIS.load(fileName, true);

        // Error while loading?
        if (fis == null) {
            System.err.println("Can't load file: '" + fileName + "'");
            return null;
        }

        FunctionBlock functionBlock = fis.getFunctionBlock("tipper");
        // Show
        JFuzzyChart.get().chart(functionBlock);

        // Set inputs
        fis.setVariable("service", 3);
        fis.setVariable("food", 7);

        // Evaluate
        fis.evaluate();

        // Show output variable's chart
        Variable tip = functionBlock.getVariable("tip");
        JFuzzyChart.get().chart(tip, tip.getDefuzzifier(), true);

        System.out.println(fis);
        System.out.println(fis.getVariable("tip").defuzzify());
        return cameraAssesment;
    }
}
