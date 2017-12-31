package ai.fuzzy;

import com.alibaba.fastjson.JSON;
import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.FunctionBlock;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;
import net.sourceforge.jFuzzyLogic.rule.Variable;

import java.io.*;
import java.nio.file.Paths;

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
    public double travel;
    public double event;
    public double sports;
    public double scenery;
    public double portrait;
    public double astronomy;
    public double newModel;
    public double durableBuild;
    public double lightBuild;
    public double lowPrice;
}

public class Main {
    public static void main(String[] args) throws IOException {
        // Read files
        File rootFolder = new File("input");
        for (final File fileEntry : rootFolder.listFiles()) {
            if (fileEntry.isFile()) {
                CameraData camera = JSON.parseObject(readFileContents(fileEntry), CameraData.class);
                camera.assesment = assess(camera);
                String jsonString = JSON.toJSONString(camera, true);
                PrintWriter out = new PrintWriter(Paths.get("result", fileEntry.getName()).toString());
                out.print(jsonString);
                out.close();
                break;
            }
        }
    }

    private static String readFileContents(File fileEntry) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(fileEntry.getAbsolutePath()), "UTF8"));
        StringBuilder sb = new StringBuilder();
        String line = in.readLine();
        while (line != null) {
            sb.append(line);
            sb.append(System.lineSeparator());
            line = in.readLine();
        }
        return sb.toString();
    }

    static CameraAssesment assess(CameraData cameraData) {
        CameraAssesment cameraAssesment = new CameraAssesment();
        String fileName = "fcl/camera.fcl";
        FIS fis = FIS.load(fileName, true);
        FunctionBlock functionBlock = fis.getFunctionBlock("camera");
//        JFuzzyChart.get().chart(functionBlock);

        // Set inputs
        fis.setVariable("price", cameraData.price);
        fis.setVariable("pixelDepth", cameraData.pixelDepth);
        fis.setVariable("pixels", cameraData.pixels);
        fis.setVariable("maxISO", cameraData.maxISO);
        fis.setVariable("weight", cameraData.weight);
        fis.setVariable("autoFocus", cameraData.autoFocus);
        fis.setVariable("launchDate", cameraData.launchDate);
        fis.setVariable("frameRate", cameraData.frameRate);
        fis.setVariable("touchScreen", cameraData.touchScreen ? 1 : 0);
        fis.setVariable("video", cameraData.video ? 1 : 0);
        fis.setVariable("flash", cameraData.flash ? 1 : 0);
        fis.setVariable("waterproof", cameraData.waterproof ? 1 : 0);
        fis.setVariable("bluetooth", cameraData.bluetooth ? 1 : 0);
        fis.setVariable("gps", cameraData.gps ? 1 : 0);
        fis.setVariable("isMetal", cameraData.isMetal ? 1 : 0);

        // Evaluate
        fis.evaluate();

        cameraAssesment.travel = fis.getVariable("travel").defuzzify();
        cameraAssesment.event = fis.getVariable("event").defuzzify();
        cameraAssesment.sports = fis.getVariable("sports").defuzzify();
        cameraAssesment.scenery = fis.getVariable("scenery").defuzzify();
        cameraAssesment.portrait = fis.getVariable("portrait").defuzzify();
        cameraAssesment.astronomy = fis.getVariable("astronomy").defuzzify();
        cameraAssesment.newModel = fis.getVariable("newModel").defuzzify();
        cameraAssesment.durableBuild = fis.getVariable("durableBuild").defuzzify();
        cameraAssesment.lightBuild = fis.getVariable("lightBuild").defuzzify();
        cameraAssesment.lowPrice = fis.getVariable("lowPrice").defuzzify();

        // Show output variable's chart
//        Variable tip = functionBlock.getVariable("tip");
//        JFuzzyChart.get().chart(tip, tip.getDefuzzifier(), true);

        return cameraAssesment;
    }
}
