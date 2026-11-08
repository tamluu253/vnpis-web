const { runMasterCloudPublishing, getCurrentScheduleSlot } = require('./master_cloud_publisher');

async function main() {
    console.log(`[VNPIS AUTO PUBLISH] Delegating to Master Autonomous Cloud Engine...`);
    try {
        await runMasterCloudPublishing();
        console.log(`[VNPIS AUTO PUBLISH] Finished successfully.`);
    } catch (err) {
        console.error(`[VNPIS AUTO PUBLISH ERROR]`, err);
        process.exit(1);
    }
}

if (require.main === module) {
    main().then(() => process.exit(0)).catch(err => {
        console.error("Pipeline Error:", err);
        process.exit(1);
    });
}

module.exports = { main, getCurrentScheduleSlot };
