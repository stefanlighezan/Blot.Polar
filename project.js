// Welcome to Blot!

// Set document dimensions
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Store final lines here
const finalLines = [];

// Function to convert polar coordinates to Cartesian coordinates
function polarToCartesian(r, theta) {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
}

// Example: create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];



// Example: transform lines using the toolkit
bt.rotate(finalLines, 45);

// Draw the transformed lines
drawLines(finalLines);

// Function to plot a polar graph based on equation "r = x"
function plotPolarGraph(equation) {
  const parts = equation.split('=');
  if (parts.length !== 2 || parts[0].trim() !== 'r') {
    console.error('Invalid polar equation format. Use "r=x".');
    return;
  }

  const expression = parts[1].trim();
  const xValues = [];
  const stepSize = 0.1; // Adjust for granularity

  for (let x = 0; x <= width; x += stepSize) {
    const r = eval(expression); // Evaluate the expression for each x
    const theta = x / width * Math.PI * 2; // Convert x to theta (angle)
    const [px, py] = polarToCartesian(r, theta);
    
    // Convert polar coordinates to Blot coordinates (adjust to fit canvas)
    const bx = px + width / 2; // Adjust for centering
    const by = height / 2 - py; // Flip y-axis for Blot

    // Store points in finalLines format
    if (x === 0) {
      finalLines.push([[bx, by]]); // Start a new line
    } else {
      finalLines[finalLines.length - 1].push([bx, by]); // Add to current line
    }
  }

  //Polar Axis
  finalLines.push([[width/2, height/2],[width, height/2]])

  // Draw the lines
  drawLines(finalLines);
}

// Example usage:
const polarEquation = "r = 5";
plotPolarGraph(polarEquation);
