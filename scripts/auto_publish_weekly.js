const fs = require('fs');
const path = require('path');
const { sendArticleNotification } = require('./send_article_email');

// Baseline start date for Week 1 (Monday, August 10, 2026)
const START_DATE = new Date('2026-08-10T00:00:00Z');

function getCurrentWeekNumber() {
    const now = new Date();
    const diffMs = now.getTime() - START_DATE.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let weekNum = Math.floor(diffDays / 7) + 1;
    if (weekNum < 1) weekNum = 1;
    if (weekNum > 52) weekNum = 52;
    return weekNum;
}

async function runWeeklyPublishingPipeline() {
    const weekNum = getCurrentWeekNumber();
    const paddedWeek = String(weekNum).padStart(2, '0');
    console.log(`========================================================================`);
    console.log(`🚀 RUNNING VNPIS WEEKLY AUTO-PUBLISHING PIPELINE - WEEK ${paddedWeek}`);
    console.log(`========================================================================`);

    const articlesDir = path.join(process.cwd(), 'vnpis-web', 'content', 'articles');
    if (!fs.existsSync(articlesDir)) {
        console.error(`[ERROR] Articles directory not found at: ${articlesDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(articlesDir);
    const weekFiles = files.filter(f => f.startsWith(`week_${paddedWeek}_vnpis_`) && f.endsWith('.md'));

    if (weekFiles.length === 0) {
        console.log(`[NOTICE] No article files found matching pattern 'week_${paddedWeek}_vnpis_*.md'.`);
        return;
    }

    console.log(`[INFO] Found ${weekFiles.length} scheduled article(s) for Week ${paddedWeek}:`);
    weekFiles.forEach(f => console.log(`   - ${f}`));

    for (const file of weekFiles) {
        const filePath = path.join(articlesDir, file);
        console.log(`\n------------------------------------------------------------------------`);
        console.log(`📢 Processing and dispatching email for: ${file}`);
        await sendArticleNotification(filePath);
    }

    console.log(`\n========================================================================`);
    console.log(`✅ WEEK ${paddedWeek} PUBLISHING & EMAIL DISPATCH COMPLETED SUCCESSFULLY`);
    console.log(`========================================================================`);
}

if (require.main === module) {
    runWeeklyPublishingPipeline().then(() => process.exit(0)).catch(err => {
        console.error("Pipeline Error:", err);
        process.exit(1);
    });
}

module.exports = { getCurrentWeekNumber, runWeeklyPublishingPipeline };
