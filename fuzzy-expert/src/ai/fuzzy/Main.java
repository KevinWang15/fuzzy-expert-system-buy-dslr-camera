package ai.fuzzy;

import com.alibaba.fastjson.JSON;
import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.JFuzzyLogic;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;

import java.io.*;
import java.nio.file.Paths;

class CameraData {
    public CameraAssessment assessment;
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

class CameraAssessment {
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
        File rootFolder = new File("input");
        for (final File fileEntry : rootFolder.listFiles()) {
            if (fileEntry.isFile()) {
                CameraData camera = JSON.parseObject(readFileContents(fileEntry), CameraData.class);
                camera.assessment = assess(camera);
                writeFile(fileEntry, JSON.toJSONString(camera, true));
            }
        }
    }

    private static void writeFile(File fileEntry, String jsonString) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(Paths.get("result", fileEntry.getName()).toString());
        out.print(jsonString);
        out.close();
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

    static CameraAssessment assess(CameraData cameraData) {
        CameraAssessment cameraAssessment = new CameraAssessment();
        String fileName = "fcl/camera.fcl";
        FIS fis = FIS.load(fileName, true);


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

        // Save results to cameraAssessment
        cameraAssessment.travel = fis.getVariable("travel").defuzzify();
        cameraAssessment.event = fis.getVariable("event").defuzzify();
        cameraAssessment.sports = fis.getVariable("sports").defuzzify();
        cameraAssessment.scenery = fis.getVariable("scenery").defuzzify();
        cameraAssessment.portrait = fis.getVariable("portrait").defuzzify();
        cameraAssessment.astronomy = fis.getVariable("astronomy").defuzzify();
        cameraAssessment.newModel = fis.getVariable("newModel").defuzzify();
        cameraAssessment.durableBuild = fis.getVariable("durableBuild").defuzzify();
        cameraAssessment.lightBuild = fis.getVariable("lightBuild").defuzzify();
        cameraAssessment.lowPrice = fis.getVariable("lowPrice").defuzzify();

        return cameraAssessment;
    }
}
