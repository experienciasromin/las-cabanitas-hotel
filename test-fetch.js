async function test() {
  const spreadsheetId = '1mm9B9cNz8H0euWFEC6siJ0WHADgXy4VTMtjs7_QXJnE';
  const urls = {
    BD: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=BD`,
    OCC: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=OCC`
  };

  try {
    console.log("Fetching BD sheet...");
    const resBD = await fetch(urls.BD);
    const textBD = await resBD.text();
    console.log("BD Sheet Rows (first 10):");
    console.log(textBD.split('\n').slice(0, 15).join('\n'));

    console.log("\nFetching OCC sheet...");
    const resOCC = await fetch(urls.OCC);
    const textOCC = await resOCC.text();
    console.log("OCC Sheet Rows (first 10):");
    console.log(textOCC.split('\n').slice(0, 15).join('\n'));
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

test();
