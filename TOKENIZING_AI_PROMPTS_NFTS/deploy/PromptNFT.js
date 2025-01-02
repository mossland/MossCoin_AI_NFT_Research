module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("PromptNFT", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("Contract deployed on Layer 2!");
};

module.exports.tags = ["PromptNFT"];
