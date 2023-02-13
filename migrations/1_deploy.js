const Announcement = artifacts.require("Announcement");

module.exports = (deployer) => {
    deployer.deploy(Announcement,'First Announcement');
}